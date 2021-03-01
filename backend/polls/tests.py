import datetime
from django.test import TestCase
from django.utils import timezone
from django.urls import reverse
from .models import Question, Choice


def create_question(question_text, days):
    """
    create a question with the given `question_text` and publish the given number of `days`
    offset to now, negative days for past, positive days for future
    """
    time = timezone.now() + datetime.timedelta(days=days)
    return Question.objects.create(question_text=question_text, pub_date=time)


def create_choice(question, choice_text):
    # create a choice with the given `question` and `choice_text` and 0 as default votes
    return question.choice_set.create(choice_text=choice_text, votes=0)


class QuestionIndexViewTests(TestCase):
    def test_no_questions(self):
        response = self.client.get(reverse('polls:index'))
        self.assertIs(response.status_code, 200)
        self.assertContains(response, "There are no polls.")
        self.assertQuerysetEqual(response.context['latest_question_list'], [])

    def test_past_question(self):
        q = create_question("past question", -10)
        create_choice(q, "choice")
        response = self.client.get(reverse('polls:index'))
        self.assertQuerysetEqual(response.context['latest_question_list'], ['<Question: past question>'])

    def test_future_question(self):
        q = create_question("future question", 10)
        create_choice(q, "choice")
        response = self.client.get(reverse('polls:index'))
        self.assertQuerysetEqual(response.context['latest_question_list'], [])

    def test_future_and_past_question(self):
        q = create_question("past question", -10)
        qq = create_question("future question", 10)
        create_choice(q, "choice")
        create_choice(qq, "choice")
        response = self.client.get(reverse('polls:index'))
        self.assertQuerysetEqual(response.context['latest_question_list'], ['<Question: past question>'])

    def test_two_past_questions(self):
        """
        The questions index page may display multiple questions.
        """
        q = create_question(question_text="Past question 1.", days=-30)
        qq = create_question(question_text="Past question 2.", days=-5)
        create_choice(q, 'choice')
        create_choice(qq, 'choice')
        response = self.client.get(reverse('polls:index'))
        self.assertQuerysetEqual(
            response.context['latest_question_list'],
            ['<Question: Past question 2.>', '<Question: Past question 1.>']
        )

    def test_past_question_with_no_choices(self):
        question = create_question("no choices", -5)
        response = self.client.get(reverse('polls:detail', args=(question.id,)))
        self.assertEqual(response.status_code, 404)

    def test_future_question_with_no_choices(self):
        question = create_question("no choices", 5)
        response = self.client.get(reverse('polls:detail', args=(question.id,)))
        self.assertEqual(response.status_code, 404)


class QuestionDetailViewTests(TestCase):
    def test_future_question(self):
        question = create_question("future question", 5)
        create_choice(question, 'choice')
        response = self.client.get(reverse('polls:detail', args=(question.id,)))
        self.assertEqual(response.status_code, 404)

    def test_past_question(self):
        question = create_question("past question", -5)
        create_choice(question, 'choice')
        response = self.client.get(reverse('polls:detail', args=(question.id,)))
        self.assertEqual(response.status_code, 200)

    def test_past_question_with_no_choices(self):
        question = create_question("no choices", -5)
        response = self.client.get(reverse('polls:detail', args=(question.id,)))
        self.assertEqual(response.status_code, 404)

    def test_future_question_with_no_choices(self):
        question = create_question("no choices", 5)
        response = self.client.get(reverse('polls:detail', args=(question.id,)))
        self.assertEqual(response.status_code, 404)


class QuestionResultsViewTests(TestCase):
    def test_future_question(self):
        question = create_question("future question", 5)
        create_choice(question, 'choice')
        response = self.client.get(reverse('polls:results', args=(question.id,)))
        self.assertEqual(response.status_code, 404)

    def test_past_question(self):
        question = create_question("past question", -5)
        create_choice(question, 'choice')
        response = self.client.get(reverse('polls:results', args=(question.id,)))
        self.assertEqual(response.status_code, 200)

    def test_past_question_with_no_choices(self):
        question = create_question("no choices", -5)
        response = self.client.get(reverse('polls:results', args=(question.id,)))
        self.assertEqual(response.status_code, 404)

    def test_future_question_with_no_choices(self):
        question = create_question("no choices", 5)
        response = self.client.get(reverse('polls:detail', args=(question.id,)))
        self.assertEqual(response.status_code, 404)


class QuestionModelTests(TestCase):
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
