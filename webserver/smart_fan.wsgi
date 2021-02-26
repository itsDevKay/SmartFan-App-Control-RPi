#! /usr/bin/python3

import logging
import sys

logging.basicConfig(stream=sys.stderr)
sys.path.insert(0, '/home/pi/SmartFan')

from smart_fan import app as application
application.secret_key = <<SECRET_KEY>>
