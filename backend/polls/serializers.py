from rest_framework import serializers
from .models import Question, Choice


class ChoiceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Choice
        fields = ['id', 'choice_text', 'votes', 'question']


class QuestionSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    choices = ChoiceSerializer(many=True)

    class Meta:
        model = Question
        fields = ['id', 'owner', 'question_text', 'pub_date', 'choices']
        ordering = ['-id']

    def create(self, validated_data):
        choices_data = validated_data.pop('choices')
        question = Question.objects.create(**validated_data)
        for choice_data in choices_data:
            Choice.objects.create(question=question, **choice_data)
        return question

    def update(self, instance, validated_data):
        choices_data = validated_data.pop('choices')
        choices = instance.choices.all()
        choices = list(choices)
        instance.question_text = validated_data.get('question_text')
        instance.pub_date = validated_data.get('pub_date')
        instance.save()
        for choice_data in choices_data:
            choice = choices.pop(0)
            choice.choice_text = choice_data.get('choice_text', choice.choice_text)
            choice.votes = choice_data.get('votes', choice.votes)
            choice.save()
        return instance
