CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE public.clients (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	"name" varchar NOT NULL,
	email varchar NULL,
	phone varchar NULL,
	coordxy varchar NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now()
);