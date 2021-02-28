import datetime
from django.utils import timezone
from django.shortcuts import render, get_object_or_404, reverse
from django.http import HttpResponseRedirect
from django.views import generic
from .models import Question, Choice


class IndexView(generic.ListView):
    template_name = 'polls/index.html'
    context_object_name = 'latest_question_list'

    def get_queryset(self):
        return Question.objects.exclude(
            pub_date__gte=timezone.now()  # filter out future questions
        ).order_by('-pub_date')


class DetailView(generic.DetailView):
    model = Question
    template_name = 'polls/detail.html'

    def get_queryset(self):
        return Question.objects.exclude(
            pub_date__gte=timezone.now()
        )


class ResultsView(generic.DetailView):
    model = Question
    template_name = 'polls/results.html'

    def get_queryset(self):
        return Question.objects.exclude(
            pub_date__gte=timezone.now()
        )


def vote(request, question_id):
    question_model = Question.objects.exclude(pub_date__gte=timezone.now())
    question = get_object_or_404(question_model, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
        return render(request, 'polls/detail.html', {
            'error_message': "You didn't select a choice",
            'question': question,
        })
    else:
        selected_choice.votes += 1
        selected_choice.save()
        """
        always return a HttpResponseRedirect after dealing with post data
        to prevent data from being posted twice in case a user hits the back button
        """
        return HttpResponseRedirect(reverse('polls:results', args=(question.id,)))
