# Generated by Django 4.0.6 on 2022-08-02 20:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pokepals_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='pokemon',
            name='sprite',
            field=models.CharField(default='', max_length=255),
        ),
    ]
