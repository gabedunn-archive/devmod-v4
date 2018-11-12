create table if not exists warnings (
  id int primary key,
  discord_id text not null,
  reason text not null,
  `date` date not null,
  mod_id text not null
);

create table if not exists bans (
  id int primary key,
  discord_id text not null,
  discord_name text not null,
  reason text not null,
  `date` date not null,
  mod_id text not null
);

create table if not exists points (
  id int primary key,
  discord_id text not null unique,
  points int not null
);

create table if not exists settings (
  id int primary key,
  key text not null unique,
  value text not null
);
