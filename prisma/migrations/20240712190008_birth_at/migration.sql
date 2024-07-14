-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(63) NOT NULL,
    "email" VARCHAR(127) NOT NULL,
    "password" VARCHAR(127) NOT NULL,
    "birthAt" DATE NOT NULL,
    "createdat" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
