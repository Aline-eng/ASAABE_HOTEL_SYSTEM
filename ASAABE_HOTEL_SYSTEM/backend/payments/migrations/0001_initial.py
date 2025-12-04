# Generated manually

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('bookings', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('method', models.CharField(choices=[('stripe', 'Stripe'), ('paypal', 'PayPal'), ('bank_transfer', 'Bank Transfer'), ('cash', 'Cash'), ('credit_card', 'Credit Card')], max_length=20)),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('processing', 'Processing'), ('completed', 'Completed'), ('failed', 'Failed'), ('refunded', 'Refunded'), ('cancelled', 'Cancelled')], default='pending', max_length=15)),
                ('transaction_id', models.CharField(blank=True, max_length=100)),
                ('stripe_payment_intent_id', models.CharField(blank=True, max_length=100)),
                ('payment_date', models.DateTimeField(auto_now_add=True)),
                ('notes', models.TextField(blank=True)),
                ('booking', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='payments', to='bookings.booking')),
            ],
            options={
                'ordering': ['-payment_date'],
            },
        ),
    ]