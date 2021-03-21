from django.utils import timezone
from django.shortcuts import render, get_object_or_404, reverse
from django.http import HttpResponseRedirect
from django.views import generic
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Question, Choice
from .serializers import QuestionSerializer, ChoiceSerializer


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ChoiceViewSet(viewsets.ModelViewSet):
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer

    @action(detail=True)
    def vote(self, request, *args, **kwargs):
        choice = self.get_object()
        choice.votes += 1
        choice.save()
        return Response(ChoiceSerializer(choice).data)


class IndexView(generic.ListView):
    template_name = 'polls/index.html'
    context_object_name = 'latest_question_list'

    def get_queryset(self):
        return Question.objects.filter(
            pub_date__lte=timezone.now()
        ).exclude(
            choices__isnull=True
        ).order_by('-pub_date')


class DetailView(generic.DetailView):
    model = Question
    template_name = 'polls/detail.html'

    def get_queryset(self):
        return Question.objects.filter(
            pub_date__lte=timezone.now()
        ).exclude(
            choices__isnull=True
        )


class ResultsView(generic.DetailView):
    model = Question
    template_name = 'polls/results.html'

    def get_queryset(self):
        return Question.objects.filter(
            pub_date__lte=timezone.now()
        ).exclude(
            choices__isnull=True
        )


def vote(request, question_id):
    question_model = Question.objects.filter(pub_date__lte=timezone.now()).exclude(choices__isnull=True)
    question = get_object_or_404(question_model, pk=question_id)
    try:
        selected_choice = question.choices.get(pk=request.POST['choice'])
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

