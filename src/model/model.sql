create table if not exists users(
    id serial not null primary key,
    balance double precision not null default 0
);

insert into users values (1, 999.98);