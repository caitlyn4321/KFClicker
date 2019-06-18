from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
)
from werkzeug.exceptions import abort

from KFClicker.auth import login_required
from KFClicker.db import get_db

bp = Blueprint('game', __name__, url_prefix='/API')

