# Generated by Django 4.0.6 on 2022-08-02 20:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pokepals_app', '0004_remove_pokemon_nickname'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pokemon',
            name='cry',
            field=models.CharField(max_length=255),
        ),
    ]