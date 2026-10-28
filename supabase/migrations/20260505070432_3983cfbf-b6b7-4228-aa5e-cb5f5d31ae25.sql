alter table public.coaching_enquiries
  add constraint name_length check (char_length(name) between 1 and 100),
  add constraint email_length check (char_length(email) between 3 and 255),
  add constraint location_length check (char_length(location) between 2 and 120),
  add constraint reason_length check (char_length(reason) between 10 and 1500),
  add constraint package_length check (char_length(package_interest) between 1 and 100),
  add constraint weekly_length check (char_length(weekly_time) between 1 and 100),
  add constraint notes_length check (notes is null or char_length(notes) <= 1000);
