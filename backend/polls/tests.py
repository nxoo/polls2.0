import datetime
from django.test import TestCase
from django.utils import timezone
from .models import Question


class QuestionModelTest(TestCase):
    def test_was_published_recently_with_future_question(self):
        """
        was_published_recently() returns false for questions whose pub_date is in the future
        """
        future_time = timezone.now() + datetime.timedelta(days=1)
        future_question = Question(pub_date=future_time)
        self.assertIs(future_question.was_published_recently(), False)

    def test_was_published_recently_with_old_question(self):
        """
        was_published_recently() returns false with questions older that one day
        """
        past_time = timezone.now() - datetime.timedelta(days=20)
        old_question = Question(pub_date=past_time)
        self.assertIs(old_question.was_published_recently(), False)

    def test_was_published_recently_with_recent_question(self):
        """
        was_published_recently() returns true with questions published
        within today
        """
        recent_time = timezone.now() - datetime.timedelta(hours=23)
        recent_question = Question(pub_date=recent_time)
        self.assertIs(recent_question.was_published_recently(), True)

