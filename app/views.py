
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Booking, Payment, Users, Flight, airline
from .serializers import BookingSerializer, CompanySerializer, UserSerializer, FlightSerializer
from .permissions import BookingPermission, FlightPermission
from django.utils import timezone



import razorpay
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response

# USER VIEWSET

class UserViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    def create(self, request, *args, **kwargs):

        print("DATA:", request.data)

        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():

            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )
        
        print("ERROR:", serializer.errors)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class CompanyViewSet(viewsets.ModelViewSet):

    queryset = airline.objects.all()
    serializer_class = CompanySerializer


# FLIGHT VIEWSET

class FlightViewSet(viewsets.ModelViewSet):
    permission_classes = [FlightPermission]

    queryset = Flight.objects.all()
    serializer_class = FlightSerializer
    def get_queryset(self):

        queryset = Flight.objects.all()

        from_city = self.request.GET.get("from")
        to_city = self.request.GET.get("to")

        if from_city:
            queryset = queryset.filter(from_location__icontains=from_city)

        if to_city:
            queryset = queryset.filter(destination__icontains=to_city)

        return queryset


# LOGIN VIEW

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone

from .models import Users


@api_view(['POST'])
def login_view(request):

    email = request.data.get('email')
    password = request.data.get('password')
  
    try:

        user = Users.objects.get(email=email)

        if user.check_password(password):

            refresh = RefreshToken.for_user(user)

            user.last_login = timezone.now()
            user.save()

            return Response({

                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'role': user.role,
                'user': UserSerializer(user).data

            }, status=status.HTTP_200_OK)

        else:

            return Response({
                'message': 'Wrong Password'
            }, status=status.HTTP_401_UNAUTHORIZED) 
          

    except Users.DoesNotExist:

        return Response({
            'message': 'User not found'
        }, status=status.HTTP_404_NOT_FOUND)
    

class BookingViewSet(viewsets.ModelViewSet):

    serializer_class = BookingSerializer

    queryset = Booking.objects.all()

    permission_classes = [BookingPermission]

    
    def get_queryset(self):

        return Booking.objects.filter(
            user=self.request.user
        ).order_by("-id")

    def perform_create(self, serializer):

        serializer.save(
            user=self.request.user
        )

    def get_queryset(self):

        user = self.request.user

        # admin/company sab dekh sakta
        if user.role in ["admin", "company"]:
            return Booking.objects.all().order_by("-id")

        # normal user sirf apni
        return Booking.objects.filter(
            user=user
        ).order_by("-id")
    


client = razorpay.Client(
    auth=("rzp_test_SC9152Au7RX5Z7", "IuIp6xLygtLefBKSfVJbh2gg")
)

@api_view(["POST"])
def create_order(request):

    total_price=int(request.data.get("amount"))
    amount = int(request.data.get("amount")) * 100
    email= request.data.get("email")
    contact = request.data.get("contact")
    Internal Server Error: /create-order/
Traceback (most recent call last):
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/backends/utils.py", line 105, in _execute
    return self.cursor.execute(sql, params)
           ~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^
psycopg2.errors.NotNullViolation: null value in column "user_email" of relation "app_payment" violates not-null constraint
DETAIL:  Failing row contains (3, 5800, null, null, order_SqlntUq17qo5Y9, , f).
The above exception was the direct cause of the following exception:
Traceback (most recent call last):
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/core/handlers/exception.py", line 55, in inner
    response = get_response(request)
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/core/handlers/base.py", line 198, in _get_response
    response = wrapped_callback(request, *callback_args, **callback_kwargs)
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/views/decorators/csrf.py", line 65, in _view_wrapper
    return view_func(request, *args, **kwargs)
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/views/generic/base.py", line 106, in view
    return self.dispatch(request, *args, **kwargs)
           ~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/rest_framework/views.py", line 515, in dispatch
    response = self.handle_exception(exc)
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/rest_framework/views.py", line 475, in handle_exception
    self.raise_uncaught_exception(exc)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/rest_framework/views.py", line 486, in raise_uncaught_exception
    raise exc
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/rest_framework/views.py", line 512, in dispatch
    response = handler(request, *args, **kwargs)
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/rest_framework/decorators.py", line 50, in handler
    return func(*args, **kwargs)
  File "/opt/render/project/src/app/views.py", line 184, in create_order
    Payment.objects.create(
    ~~~~~~~~~~~~~~~~~~~~~~^
        amount=str(total_price),
        ^^^^^^^^^^^^^^^^^^^^^^^^
    ...<2 lines>...
        order_id=payment["id"]
        ^^^^^^^^^^^^^^^^^^^^^^
    )
    ^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/models/manager.py", line 87, in manager_method
    return getattr(self.get_queryset(), name)(*args, **kwargs)
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/models/query.py", line 669, in create
    obj.save(force_insert=True, using=self.db)
    ~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/models/base.py", line 874, in save
    self.save_base(
    ~~~~~~~~~~~~~~^
        using=using,
        ^^^^^^^^^^^^
    ...<2 lines>...
        update_fields=update_fields,
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    )
    ^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/models/base.py", line 966, in save_base
    updated = self._save_table(
        raw,
    ...<4 lines>...
        update_fields,
    )
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/models/base.py", line 1169, in _save_table
    results = self._do_insert(
        cls._base_manager, using, insert_fields, returning_fields, raw
    )
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/models/base.py", line 1220, in _do_insert
    return manager._insert(
           ~~~~~~~~~~~~~~~^
        [self],
        ^^^^^^^
    ...<3 lines>...
        raw=raw,
        ^^^^^^^^
    )
    ^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/models/manager.py", line 87, in manager_method
    return getattr(self.get_queryset(), name)(*args, **kwargs)
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/models/query.py", line 1918, in _insert
    return query.get_compiler(using=using).execute_sql(returning_fields)
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/models/sql/compiler.py", line 1925, in execute_sql
    cursor.execute(sql, params)
    ~~~~~~~~~~~~~~^^^^^^^^^^^^^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/backends/utils.py", line 122, in execute
    return super().execute(sql, params)
           ~~~~~~~~~~~~~~~^^^^^^^^^^^^^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/backends/utils.py", line 79, in execute
    return self._execute_with_wrappers(
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~^
        sql, params, many=False, executor=self._execute
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    )
    ^
580000 None None
127.0.0.1 - - [18/May/2026:14:30:59 +0530] "POST /create-order/ HTTP/1.1" 500 19623 "https://make-my-trip-front-end-w5x3.vercel.app/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0"
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/backends/utils.py", line 92, in _execute_with_wrappers
    return executor(sql, params, many, context)
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/backends/utils.py", line 100, in _execute
    with self.db.wrap_database_errors:
         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/utils.py", line 94, in __exit__
    raise dj_exc_value.with_traceback(traceback) from exc_value
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/backends/utils.py", line 105, in _execute
    return self.cursor.execute(sql, params)
           ~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^
django.db.utils.IntegrityError: null value in column "user_email" of relation "app_payment" violates not-null constraint
DETAIL:  Failing row contains (3, 5800, null, null, order_SqlntUq17qo5Y9, , f).  fix this error

Ye error simple hai:

❌ Problem
null value in column "user_email" violates not-null constraint
Matlab tum Payment.objects.create() kar rahe ho, lekin user_email field NULL ja rahi hai, jabki model me null=False (NOT NULL constraint) hai.

🔥 Root Cause
Tumhare create_order view me kuch aisa ho raha hai:

Payment.objects.create(
    amount=total_price,
    user_email=...,   # ❌ yaha None ja raha hai
    order_id=payment["id"]
)
Log me bhi dikha:

580000 None None order_SqlntUq17qo5Y9
👉 clearly user_email = None

✅ Fix Options (choose one)
✅ OPTION 1: user_email backend se correctly bhejo (BEST FIX)
Agar user logged in hai:

user_email = request.user.email
Then:

Payment.objects.create(
    amount=str(total_price),
    user_email=request.user.email,
    order_id=payment["id"]
)
👉 Ensure user authenticated ho (IsAuthenticated)

✅ OPTION 2: frontend se email send karo
Frontend request body:

{
  amount: 5800,
  user_email: user.email
}
Backend:

user_email = request.data.get("user_email")
Then:

Payment.objects.create(
    amount=str(total_price),
    user_email=user_email,
    order_id=payment["id"]
)
⚠️ OPTION 3 (NOT RECOMMENDED): allow null in DB
Model change:

user_email = models.EmailField(null=True, blank=True)
Then migrate:

python manage.py makemigrations
python manage.py migrate
👉 But ye weak approach hai (payment tracking break ho sakta hai)

🚀 Best Practice (Recommended)
Use authenticated user relation instead of email string

Better model:

user = models.ForeignKey(User, on_delete=models.CASCADE)
Then:

Payment.objects.create(
    user=request.user,
    amount=str(total_price),
    order_id=payment["id"]
)
👍 Final Fix (quick patch)
Just fix your view like this:

Payment.objects.create(
    amount=str(total_price),
    user_email=request.user.email if request.user.is_authenticated else None,
    order_id=payment["id"]
)
BUT ONLY if null allowed.

💬 If you want
Main tumhe full Razorpay + Django create_order + verify_payment flow clean architecture me refactor karke de sakta hoon, kyunki abhi structure thoda fragile lag raha hai.


Internal Server Error: /create-order/
Traceback (most recent call last):
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/backends/utils.py", line 105, in _execute
    return self.cursor.execute(sql, params)
           ~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^
psycopg2.errors.NotNullViolation: null value in column "contact" of relation "app_payment" violates not-null constraint
DETAIL:  Failing row contains (5, 5800, mohitrahangdale67890@gmail.com, null, order_SqlxRvF5kPevGq, , f).
The above exception was the direct cause of the following exception:
Traceback (most recent call last):
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/core/handlers/exception.py", line 55, in inner
    response = get_response(request)
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/core/handlers/base.py", line 198, in _get_response
    response = wrapped_callback(request, *callback_args, **callback_kwargs)
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/views/decorators/csrf.py", line 65, in _view_wrapper
    return view_func(request, *args, **kwargs)
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/views/generic/base.py", line 106, in view
    return self.dispatch(request, *args, **kwargs)
           ~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/rest_framework/views.py", line 515, in dispatch
    response = self.handle_exception(exc)
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/rest_framework/views.py", line 475, in handle_exception
    self.raise_uncaught_exception(exc)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/rest_framework/views.py", line 486, in raise_uncaught_exception
    raise exc
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/rest_framework/views.py", line 512, in dispatch
    response = handler(request, *args, **kwargs)
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/rest_framework/decorators.py", line 50, in handler
    return func(*args, **kwargs)
  File "/opt/render/project/src/app/views.py", line 185, in create_order
    Payment.objects.create(
    ~~~~~~~~~~~~~~~~~~~~~~^
        amount=str(total_price),
        ^^^^^^^^^^^^^^^^^^^^^^^^
    ...<2 lines>...
        order_id=payment["id"]
        ^^^^^^^^^^^^^^^^^^^^^^
    )
    ^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/models/manager.py", line 87, in manager_method
    return getattr(self.get_queryset(), name)(*args, **kwargs)
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/models/query.py", line 669, in create
    obj.save(force_insert=True, using=self.db)
    ~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/models/base.py", line 874, in save
    self.save_base(
    ~~~~~~~~~~~~~~^
        using=using,
        ^^^^^^^^^^^^
    ...<2 lines>...
        update_fields=update_fields,
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    )
    ^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/models/base.py", line 966, in save_base
    updated = self._save_table(
        raw,
    ...<4 lines>...
        update_fields,
    )
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/models/base.py", line 1169, in _save_table
    results = self._do_insert(
        cls._base_manager, using, insert_fields, returning_fields, raw
    )
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/models/base.py", line 1220, in _do_insert
    return manager._insert(
           ~~~~~~~~~~~~~~~^
        [self],
        ^^^^^^^
    ...<3 lines>...
        raw=raw,
        ^^^^^^^^
    )
    ^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/models/manager.py", line 87, in manager_method
    return getattr(self.get_queryset(), name)(*args, **kwargs)
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/models/query.py", line 1918, in _insert
    return query.get_compiler(using=using).execute_sql(returning_fields)
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/models/sql/compiler.py", line 1925, in execute_sql
    cursor.execute(sql, params)
    ~~~~~~~~~~~~~~^^^^^^^^^^^^^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/backends/utils.py", line 122, in execute
    return super().execute(sql, params)
           ~~~~~~~~~~~~~~~^^^^^^^^^^^^^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/backends/utils.py", line 79, in execute
    return self._execute_with_wrappers(
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~^
        sql, params, many=False, executor=self._execute
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    )
    ^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/backends/utils.py", line 92, in _execute_with_wrappers
    return executor(sql, params, many, context)
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/backends/utils.py", line 100, in _execute
    with self.db.wrap_database_errors:
         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/utils.py", line 94, in __exit__
    raise dj_exc_value.with_traceback(traceback) from exc_value
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/backends/utils.py", line 105, in _execute
    return self.cursor.execute(sql, params)
           ~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^
django.db.utils.IntegrityError: null value in column "contact" of relation "app_payment" violates not-null constraint
DETAIL:  Failing row contains (5, 5800, mohitrahangdale67890@gmail.com, null, order_SqlxRvF5kPevGq, , f).
None
580000 None None
127.0.0.1 - - [18/May/2026:14:40:02 +0530] "POST /create-order/ HTTP/1.1" 500 19693 "https://make-my-trip-front-end-w5x3.vercel.app/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0"

Ab same problem ka next field expose ho gaya hai 👇

❌ Error
null value in column "contact" violates not-null constraint
👉 Matlab: Payment.objects.create() me contact field NULL ja rahi hai, but DB me contact NOT NULL hai.

🔥 Root Cause
Tumhara insert kuch aisa ho raha hai:

amount = 5800
email = OK
contact = None ❌
order_id = OK
Log bhi confirm kar raha hai:

580000 None None
👉 yaha second None = contact

✅ Fix (Immediate)
✔️ Step 1: frontend se contact bhejo
Request body me add karo:

{
  amount: 5800,
  user_email: "test@gmail.com",
  contact: "9876543210"
}
✔️ Step 2: backend me read karo
contact = request.data.get("contact")
✔️ Step 3: create order fix
Payment.objects.create(
    amount=str(total_price),
    user_email=request.data.get("user_email"),
    contact=request.data.get("contact"),
    order_id=payment["id"]
)
⚠️ IMPORTANT (best debugging tip)
Print karo before save:

print("EMAIL:", request.data.get("user_email"))
print("CONTACT:", request.data.get("contact"))
print("TOTAL:", total_price)
🚀 Better Design (recommended)
Agar user login system hai, toh:

user = request.user
Then:

Payment.objects.create(
    user_email=user.email,
    contact=getattr(user, "phone", None),
    amount=str(total_price),
    order_id=payment["id"]
)
💡 Real Issue Pattern (tumhare errors se clear hai)
Tumhara backend currently:

email sometimes missing ❌

contact sometimes missing ❌

DB strict NOT NULL ❌

👉 Is mismatch ki wajah se baar-baar crash ho raha hai

🛠️ Best long-term fix (strong suggestion)
Model ko clean karo:

class Payment:
    user = ForeignKey(User)
    contact = CharField(null=True, blank=True)
OR make both required properly from frontend validation.

👍 If you want next step help
Main tumhe:

🔥 “Razorpay + Django clean production flow”
order creation safe

payment verification

webhook handling

no null errors ever

sab ek proper structure me bana ke de sakta hoon.


Internal Server Error: /create-order/
Traceback (most recent call last):
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/backends/utils.py", line 105, in _execute
    return self.cursor.execute(sql, params)
           ~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^
psycopg2.errors.NotNullViolation: null value in column "contact" of relation "app_payment" violates not-null constraint
DETAIL:  Failing row contains (8, 5800, mohitrahangdale67890@gmail.com, null, order_SqmDxffy8zTYCN, , f).
The above exception was the direct cause of the following exception:
Traceback (most recent call last):
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/core/handlers/exception.py", line 55, in inner
    response = get_response(request)
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/core/handlers/base.py", line 198, in _get_response
    response = wrapped_callback(request, *callback_args, **callback_kwargs)
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/views/decorators/csrf.py", line 65, in _view_wrapper
    return view_func(request, *args, **kwargs)
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/views/generic/base.py", line 106, in view
    return self.dispatch(request, *args, **kwargs)
           ~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/rest_framework/views.py", line 515, in dispatch
    response = self.handle_exception(exc)
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/rest_framework/views.py", line 475, in handle_exception
    self.raise_uncaught_exception(exc)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/rest_framework/views.py", line 486, in raise_uncaught_exception
    raise exc
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/rest_framework/views.py", line 512, in dispatch
    response = handler(request, *args, **kwargs)
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/rest_framework/decorators.py", line 50, in handler
    return func(*args, **kwargs)
  File "/opt/render/project/src/app/views.py", line 185, in create_order
    Payment.objects.create(
    ~~~~~~~~~~~~~~~~~~~~~~^
        amount=str(total_price),
        ^^^^^^^^^^^^^^^^^^^^^^^^
    ...<2 lines>...
        order_id=payment["id"]
        ^^^^^^^^^^^^^^^^^^^^^^
    )
    ^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/models/manager.py", line 87, in manager_method
    return getattr(self.get_queryset(), name)(*args, **kwargs)
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/models/query.py", line 669, in create
    obj.save(force_insert=True, using=self.db)
    ~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/models/base.py", line 874, in save
    self.save_base(
    ~~~~~~~~~~~~~~^
        using=using,
        ^^^^^^^^^^^^
    ...<2 lines>...
        update_fields=update_fields,
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    )
    ^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/models/base.py", line 966, in save_base
    updated = self._save_table(
        raw,
    ...<4 lines>...
        update_fields,
    )
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/models/base.py", line 1169, in _save_table
    results = self._do_insert(
        cls._base_manager, using, insert_fields, returning_fields, raw
    )
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/models/base.py", line 1220, in _do_insert
    return manager._insert(
           ~~~~~~~~~~~~~~~^
        [self],
        ^^^^^^^
    ...<3 lines>...
        raw=raw,
        ^^^^^^^^
    )
    ^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/models/manager.py", line 87, in manager_method
    return getattr(self.get_queryset(), name)(*args, **kwargs)
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/models/query.py", line 1918, in _insert
    return query.get_compiler(using=using).execute_sql(returning_fields)
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/models/sql/compiler.py", line 1925, in execute_sql
    cursor.execute(sql, params)
    ~~~~~~~~~~~~~~^^^^^^^^^^^^^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/backends/utils.py", line 122, in execute
    return super().execute(sql, params)
           ~~~~~~~~~~~~~~~^^^^^^^^^^^^^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/backends/utils.py", line 79, in execute
    return self._execute_with_wrappers(
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~^
        sql, params, many=False, executor=self._execute
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    )
    ^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/backends/utils.py", line 92, in _execute_with_wrappers
    return executor(sql, params, many, context)
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/backends/utils.py", line 100, in _execute
    with self.db.wrap_database_errors:
         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/utils.py", line 94, in __exit__
    raise dj_exc_value.with_traceback(traceback) from exc_value
  File "/opt/render/project/src/.venv/lib/python3.14/site-packages/django/db/backends/utils.py", line 105, in _execute
    return self.cursor.execute(sql, params)
           ~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^
django.db.utils.IntegrityError: null value in column "contact" of relation "app_payment" violates not-null constraint
DETAIL:  Failing row contains (8, 5800, mohitrahangdale67890@gmail.com, null, order_SqmDxffy8zTYCN, , f).
None
580000 None None
127.0.0.1 - - [18/May/2026:14:55:39 +0530] "POST /create-order/ HTTP/1.1" 500 19696 "https://make-my-trip-front-end-w5x3.vercel.app/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0" fix this error

Ye error same root issue ka repeat version hai — bas ab clearly confirm ho gaya:

❌ Problem
null value in column "contact"
👉 Tum Payment.objects.create() me contact field pass hi nahi kar rahe ho ya None ja raha hai

Log proof:

580000 None None
          ↑
       contact = None
🔥 Why it is happening
Tumhare /create-order/ view me:

contact = request.data.get("contact")
👉 BUT frontend se contact aa hi nahi raha OR wrong key name hai

🚀 FIX (100% working steps)
✔️ STEP 1: Frontend check karo (MOST IMPORTANT)
React / frontend request me ye hona MUST hai:

axios.post("/create-order/", {
  amount: 5800,
  user_email: "abc@gmail.com",
  contact: "9876543210"   // ❌ agar ye missing hai toh error
})
👉 90% chance yahi missing hai

✔️ STEP 2: Backend safe handling add karo
email = request.data.get("user_email")
contact = request.data.get("contact")
👉 debug print add karo:

print("EMAIL:", email)
print("CONTACT:", contact)
print("DATA:", request.data)


    payment = client.order.create({
        "amount": amount,
        "currency": "INR",
        "payment_capture": "1"
    })


    Payment.objects.create(
        amount=str(total_price),
        user_email=request.user.email,
        contact=contact,
        order_id=payment["id"]
    )
    print(payment)

    return Response(payment)


    
@api_view(["POST"])
def payment_status(request):

    response = request.data

    razorpay_data = {"razorpay_order_id": response.get("razorpay_order_id"),
                     "razorpay_payment_id":response.get("razorpay_payment_id"),
                       "razorpay_signature":response.get("razorpay_signature"),
    }

    print(razorpay_data)

    try:

        # -----------------------------------
        # VERIFY PAYMENT
        # -----------------------------------
        client.utility.verify_payment_signature(
            razorpay_data
        )

        # -----------------------------------
        # UPDATE PAYMENT
        # -----------------------------------
        payment = Payment.objects.get(
            order_id=response.get(
                "razorpay_order_id"
            )
        )

        payment.razorpay_payment_id = response.get(
            "razorpay_payment_id"
        )

        payment.paid = True

        payment.save()

        return Response(
            {
                "status": True,
                "message": "Payment Success"
            },
            status=status.HTTP_200_OK
        )

    except Exception as e:

        print(e)

        return Response(
            {
                "status": False,
                "message": "Payment Failed"
            },
            status=status.HTTP_400_BAD_REQUEST
        )