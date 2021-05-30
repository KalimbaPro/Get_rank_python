#!/usr/bin/env python3
import xlsxwriter
from get_complementary_stats import complementary_stats

def write_header(worksheet, profile):
    worksheet.write('A1', 'Battle_tag')
    worksheet.write('B1', 'Niveau')
    worksheet.write('C1', 'Recomandation')
    worksheet.write('D1', 'Tank')
    worksheet.write('E1', 'Dps')
    worksheet.write('F1', 'Heal')

def write_stats(profile, worksheet):
    row = 1
    column = 0

    for player in profile:
        for i in range (len(player)):
            worksheet.write(row, column + i, player[i])
        row += 1

def write_complete_stats(profile, worksheet):
    complementary = complementary_stats(profile)
    worksheet.write('B11', 'Niveau total = ' + str(complementary.real_level))
    worksheet.write('C11', 'Recomandation moyenne = ' + str(complementary.average_endorsement))
    worksheet.write('D11', 'Moyenne Tank : ' + str(complementary.average_tank_sr))
    worksheet.write('E11', 'Moyenne Dégats : ' + str(complementary.average_damage_sr))
    worksheet.write('F11', 'Moyenne Heal : ' + str(complementary.average_support_sr))

def write_file(profile):
    workbook = xlsxwriter.Workbook('rank.xlsx')
    worksheet = workbook.add_worksheet()
    write_header(worksheet, profile)
    write_stats(profile, worksheet)
    write_complete_stats(profile, worksheet)
    workbook.close()