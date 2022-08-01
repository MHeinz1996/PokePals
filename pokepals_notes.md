# HomePage
- When user navigates to PokePals site, they are greeted with a log in form
- There is a link to Sign Up if the user has not already made an account.

## Sign Up
- user can enter an email and password to sign up
- will have to perform some kind of try/catch handling if the user tries to enter an email that already exists
- when user successfully creates an account, redirect them to the log in page so that they can log in
- WHEN DOING ANY KIND OF CSRF FUNCTION, NEED TO RELOAD THE PAGE AFTER EXPENDING CSRF TOKEN TO GENERATE A NEW TOKEN FOR LATER USE