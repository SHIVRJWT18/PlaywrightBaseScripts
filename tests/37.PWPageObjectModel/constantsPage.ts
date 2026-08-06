import { faker } from '@faker-js/faker';

export const RegisterData  = {

    registerURL: "https://parabank.parasoft.com/parabank/register.htm",
    appTitle: "ParaBank | Register for Free Online Account Access",
    firstName: faker.person.firstName(),
   lastName: faker.person.lastName(),
   address: faker.location.streetAddress(),
   city: faker.location.city(),
   state: faker.location.state(),
   zipcode: faker.string.numeric(6),
   phone: faker.string.numeric(10),
   ssn: faker.string.numeric(4),
   username: faker.internet.username() + faker.number.int(9999),
   password: 'Test@123',
   confirmPassword: 'Test@123',
};

export const LoginData  = {
    loginURL: "https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC",
    appTitle: "ParaBank | Welcome | Online Banking",
};

export const Overview  = {
    overviewURL: "https://parabank.parasoft.com/parabank/overview.htm",
    appTitle: "ParaBank | Accounts Overview",
};

export const OpenNewAccount  = {
    openAccountURL: "https://parabank.parasoft.com/parabank/openaccount.htm",
    appTitle: "ParaBank | Open Account",
    appUrl: "https://parabank.parasoft.com/parabank/openaccount.htm"
};


export const AccountOverview  = {
    accountOverviewURL: "https://parabank.parasoft.com/parabank/overview.htm",
    appTitle: "ParaBank | Accounts Overview",
};