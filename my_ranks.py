#!/usr/bin/env python3
import requests
import re
from urllib.parse import unquote
from write_in_excel import write_file

def get_url(filepath):
    url_list = open(filepath, 'r')
    url_list = url_list.read().split('\n')
    return (url_list)

def get_request(battle_tag):
    adress = "https://ow-api.com/v1/stats/pc/eu/:btag/profile"
    new_adress = re.sub(':btag', str(battle_tag), adress)
    response = requests.get(new_adress)
    rank_json = response.json()
    return (rank_json)

def get_levels(request):
    level = int(request['level']) + (int(request['prestige']) * 100)
    endorsement = request['endorsement']
    return (level, endorsement)

def get_role_queue_ranks(ratings):
    ranks = [0, 0, 0, 0]

    for i in range (len(ratings)):
        ranks[int(ratings[i]['role'] == 'tank') + (int(ratings[i]['role'] == 'damage') * 2) + (int(ratings[i]['role'] == 'support') * 3)] = ratings[i]['level']
    return (ranks[1:])

def get_battletag(battle_tag):
    battle_tag = battle_tag.replace('-', '#')
    battle_tag = unquote(battle_tag)
    return (battle_tag)

def get_all_profile(url_list):
    profile = []
    levels = []

    for battle_tag in url_list:
        request = get_request(battle_tag)
        if (request['private'] == 1):
            continue
        levels = get_levels(request)
        ranks = get_role_queue_ranks(request['ratings'])
        battle_tag = get_battletag(battle_tag)
        profile.append([battle_tag, levels[0], levels[1], ranks[0], ranks[1], ranks[2]])
        print("ACCOUNT", battle_tag, "UPDATE")
    print("DATA RECEVIED")
    return(profile)

def main():
    url_list = get_url("adress.txt")
    profile = get_all_profile(url_list)
    
    write_file(profile)
    print("UPDATE COMPLETE")

if __name__ == "__main__":
    main()