# Generated by Django 4.0.6 on 2022-08-02 20:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pokepals_app', '0003_alter_pokemon_trainer'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pokemon',
            name='nickname',
        ),
    ]