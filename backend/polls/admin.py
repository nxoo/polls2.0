from django.contrib import admin
from .models import Question, Choice


class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 3


class QuestionAdmin(admin.ModelAdmin):
    fields = ['pub_date', 'question_text']
    inlines = [ChoiceInline]
    list_display = ['question_text', 'pub_date', 'was_published_recently']
    list_filter = ['pub_date']
    search_fields = ['question_text']


class ChoiceAdmin(admin.ModelAdmin):
    list_display = ['choice_text', 'votes', 'question']
    list_filter = ['question']
    search_fields = ['choice_text']


admin.site.register(Question, QuestionAdmin)
admin.site.register(Choice, ChoiceAdmin)
