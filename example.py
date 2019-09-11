import os 
import sys

argv = ','.join(sys.argv[1:])
path = os.getcwd()

print(f'''
*****************************************
  Success!

  Script ran with the settings:
  [{sys.argv}]
  in the {path} folder
*****************************************
''')
