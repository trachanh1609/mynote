from django.db import models

# Company has many Programmers
class Company(models.Model):
    name = models.CharField(max_length=50)


class Language(models.Model):
    name = models.CharField(max_length=50)


class Programmer(models.Model):
    name = models.CharField(max_length=50)
    
    # Many-One relationship
    company = models.ForeignKey(Company)

    #Many-Many
    languages = models.ManyToManyField(Language)