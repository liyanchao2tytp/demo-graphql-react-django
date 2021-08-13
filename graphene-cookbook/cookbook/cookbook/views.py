from django.http import HttpResponse
from django.utils import autoreload
from django.core.management.base import BaseCommand

def test_reload(request):


    return HttpResponse()

from django.utils import autoreload

def do_something(*args, **kwargs):
    # management command logic
    pass

class Command(BaseCommand):

    def handle(self, *args, **options):
        self.stdout('This command auto reloads. No need to restart...')
        autoreload.main(do_something, args=None, kwargs=None)