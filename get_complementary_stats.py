#!/usr/bin/env python3
from enum import Enum

class stat(Enum):
    BATTLE_TAG = 0
    LEVEL = 1
    ENDORSEMENT = 2
    TANK = 3
    DAMAGE = 4
    HEAL = 5

class complementary_stats:
    def __init__(self, profile):
        self.nb_account = len(profile)
        self.real_level = 0
        self.average_endorsement = 0
        self.average_tank_sr = 0
        self.average_damage_sr = 0
        self.average_support_sr = 0
        self.get_all_stats(profile)

    def get_average(self, profile, index):
        temp = 0
        average = 0
        for player in profile:
            if player[index] == 0:
                continue
            average += player[index]
            temp += 1
        average /= temp
        return (round(average))

    def get_all_stats(self, profile):
        for player in profile:
            self.real_level += player[stat.LEVEL.value]
            self.average_endorsement += player[stat.ENDORSEMENT.value]
        self.average_endorsement /= self.nb_account
        self.average_endorsement = round(self.average_endorsement, 2)
        self.average_tank_sr = self.get_average(profile, stat.TANK.value)
        self.average_damage_sr = self.get_average(profile, stat.DAMAGE.value)
        self.average_support_sr = self.get_average(profile, stat.HEAL.value)