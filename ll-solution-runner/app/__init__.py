from flask import Flask
from redis import Redis
import rq

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'your_secret_key'
    app.config['REDIS_URL'] = 'redis://redis:6379/0'

    redis_conn = Redis.from_url(app.config['REDIS_URL'])
    app.task_queue = rq.Queue('ll-solution-runner-tasks', connection=redis_conn)

    from .api import api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    return app
