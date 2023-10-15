from flask import Flask, redirect, request, url_for, session
import spotipy
from spotipy.oauth2 import SpotifyOAuth
from dotenv import load_dotenv
import os
import time
import json
import requests
load_dotenv()

app=Flask(__name__)

app.secret_key = "hb686r048168:grou"
app.config['SESSION_COOKIE_NAME'] = "Lux's Cookie"
TOKEN_INFO = "token_info"


@app.route('/login')
def login():
    sp_oauth = create_spotify_oauth()
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)
    

@app.route('/redirect')
def redirectPage():
    sp_oauth = create_spotify_oauth()
    auth_url = sp_oauth.get_authorize_url()
    session.clear()
    code = request.args.get('code')
    token_info = sp_oauth.get_access_token(code)
    session[TOKEN_INFO] = token_info
    return redirect('http://wrapitup.com/')  # Replace with your actual React front-end URL


@app.route('/getUserProfile')
def getUserProfile():
    sp_oauth = create_spotify_oauth()  # Create the sp_oauth object here
    token_info = get_token()  # Pass the sp_oauth object to get_token
    if token_info is None:
        print("User not logged in")
        return redirect("/")
    sp = spotipy.Spotify(auth=token_info['access_token'])
    user_profile = sp.current_user()
    profile_picture_url = user_profile.get("images")[0]["url"] if user_profile.get("images") else None
    email = user_profile.get("email")
    name = user_profile.get("display_name")

    # Print the profile picture URL
    if not profile_picture_url:
        print("User doesn't have a profile picture.")
    if not email:
        print("User doesn't have an email address.")
    if not name:
        print("User doesn't have an display name.")


    return json.dumps({'image_url': profile_picture_url, 'email':email, 'name':name})


@app.route('/getTracks')
def getTracks():
    sp_oauth = create_spotify_oauth()  # Create the sp_oauth object here
    token_info = get_token()  # Pass the sp_oauth object to get_token
    if token_info is None:
        print("User not logged in")
        return redirect("/")
    sp = spotipy.Spotify(auth=token_info['access_token'])
    all_songs = []
    iteration = 0
    while True:
        response = sp.current_user_saved_tracks(limit=50, offset=len(all_songs)) 
        items = response['items']

        if not items:
            break

        for item in items:
            track_data = {
                'name': item['track']['name'],
                'artist': item['track']['artists'][0]['name'],
                'album': item['track']['album']['name'],
                'image_url': item['track']['album']['images'][0]['url']
            }
            all_songs.append(track_data)

    return json.dumps({'songs': all_songs})

@app.route('/getTopTracks')
def getTopTracks():
    time_range = request.args.get('time_range', 'long_term')
    sp_oauth = create_spotify_oauth()
    token_info = get_token()
    if token_info is None:
        print("User not logged in")
        return redirect("/")

    sp = spotipy.Spotify(auth=token_info['access_token'])
    
    # You can adjust the time_range parameter as needed (short_term, medium_term, long_term)
    top_tracks = sp.current_user_top_tracks(limit=50, time_range=time_range)

    # Extract relevant information from the top tracks
    top_track_data = []
    for track in top_tracks['items']:
        track_data = {
            'name': track['name'],
            'popularity': track['popularity'],
            'artist': track['artists'][0]['name'],
            'album': track['album']['name'],
            'image_url': track['album']['images'][0]['url']
        }
        top_track_data.append(track_data)

    user_profile = sp.current_user()
    user_profile_image_url = user_profile['images'][0]['url']

    return json.dumps({'top_tracks': top_track_data, 'token_info': token_info})

@app.route('/getTopArtists')
def getTopArtists():
    time_range = request.args.get('time_range', 'long_term')
    sp_oauth = create_spotify_oauth()
    token_info = get_token()
    if token_info is None:
        print("User not logged in")
        return redirect("/")

    sp = spotipy.Spotify(auth=token_info['access_token'])
    top_artists = sp.current_user_top_artists(limit=50, time_range=time_range)
    top_artist_data = []
    for artist in top_artists['items']:
        artist_data = {
            'name': artist['name'],
            'genres':artist['genres'],
            'popularity':artist['popularity'],
            'image_url': artist['images'][0]['url'],
        }
        top_artist_data.append(artist_data)

    user_profile = sp.current_user()
    user_profile_image_url = user_profile['images'][0]['url']
    return json.dumps({'top_artists': top_artist_data})

def get_token():
    token_info = session.get(TOKEN_INFO, None)
    if token_info is None:
        return redirect("/")
    now = int(time.time())
    is_expired = token_info['expires_at'] - now < 60
    if is_expired:
        sp_oauth = create_spotify_oauth()
        token_info = sp_oauth.refresh_access_token(token_info['refresh_token'])
    return token_info


def create_spotify_oauth():
    return SpotifyOAuth(
        client_id = os.getenv("CLIENT_ID"),
        client_secret = os.getenv("CLIENT_SECRET"),
        redirect_uri=url_for('redirectPage', _external=True),
        scope="user-library-read, user-top-read, user-read-email,user-read-private") 
