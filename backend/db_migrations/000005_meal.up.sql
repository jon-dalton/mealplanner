begin;

create type app.category_t as enum('Breakfast', 'Lunch', 'Dinner', 'Snack');
comment on type app.category_t is 'Possible values for Meal category. "Breakfast","Lunch","Dinner","Snack"';

create table if not exists app.meal (
    id bigserial primary key,
    code numeric,
    name_en TEXT not NULL,
    name_fr TEXT,
    tags text[],
    description_en text,
    description_fr text,
    categories app.category_t[],
    photo_url text,
    video_url text,
    method text,
    prep_time numeric,
    cook_time numeric,
    total_cost numeric,
    serving_cost numeric,
    tips text,
    servings_size numeric,
    servings_size_unit text,
    portions numeric,
    nutrition_rating integer default 10,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);
comment on table app.meal is 'Meal details which comprise a recipe including ingredients and measurements along with preparation instructions.';
comment on column app.meal.code is 'Unique code for the meal such 1, 2, 3, etc to later show as M001 - need not be same as the db id';
comment on column app.meal.name_en is 'Short name or title in English';
comment on column app.meal.name_fr is 'Short name or title in French';
comment on column app.meal.tags is 'A list of tags (strings) used to apply attributes to the Meal/recipe. May include things like "vegetarian" or "contains peanuts" to facilitate filtering and matching with user''s dietrary needs and so forth. Tag values are determined by the user.';
comment on column app.meal.description_en is 'Longer form description of the recipe to complement the name, in English';
comment on column app.meal.description_fr is 'Longer form description of the recipe to complement the name, in French';
comment on column app.meal.categories is 'Categories for which this Meal is appropriate. This is used to restrict Categories to which a Meal may be assigned within a Meal Plan. These iclude "Breakfast", "Lunch", "Dinner", "Snack"';
comment on column app.meal.photo_url is '??';
comment on column app.meal.video_url is '??';
comment on column app.meal.method is 'The instructions for preparing the recipe, usually in point form. Plain text formatting determined by the user.';
comment on column app.meal.prep_time is 'The typical time to prep for the recipe, in minutes.';
comment on column app.meal.cook_time is 'The typical time to complete the recipe, in minutes.';
comment on column app.meal.total_cost is 'An estimate of the cost of ingredients.';
comment on column app.meal.serving_cost is 'An estimate of the cost per serving.';
comment on column app.meal.tips is 'Some tips and tricks that could help make recipe preparation successful.';
comment on column app.meal.servings_size is 'The numerical size of each serving, combines with servingSizeUnit';
comment on column app.meal.servings_size_unit is 'The unit of measure to complement servingSize';
comment on column app.meal.portions is 'The number of people this recipe is meant to serve.';
comment on column app.meal.nutrition_rating is 'An overall nutritional quality rating from 1 - 10';

create trigger tg_meal_set_updated_at before update
on app.meal 
for each row execute procedure app.set_updated_at();

create trigger tg_meal_set_created_at before insert
on app.meal 
for each row execute procedure app.set_created_at();

create or replace function app.meal_nutrition(m app.meal) returns app.nutrition as $$
  select * from app.nutrition n where n.nutritionable_id=m.id and n.nutritionable_type='meal' limit 1;
$$ language sql stable;
comment on function app.meal_nutrition(app.meal) is 'Provides a link to the detailed nutritional break down for the recipe, similar to the nutrition label on a Product, if available.';

create or replace function app.all_meal_tags() returns SETOF text as $$
  select distinct unnest(tags) as tag from app.meal;
$$ language sql stable;

comment on function app.all_meal_tags() IS 'Unique tags from all meals';

grant execute on function app.all_meal_tags() to app_anonymous, app_user, app_meal_designer, app_admin;
end;

grant select, insert, update, delete on table app.meal 
to app_meal_designer, app_admin;

grant select on table app.meal 
to app_anonymous, app_user, app_meal_designer, app_admin;

grant usage on sequence app.meal_id_seq 
to app_meal_designer, app_admin;

grant execute on function app.meal_nutrition(app.meal) 
to app_anonymous, app_user, app_meal_designer, app_admin;

commit;
