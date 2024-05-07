const db = require('../models');
const Users = db.users;

const EmailAccounts = db.email_accounts;

const Emails = db.emails;

const Organizations = db.organizations;

const SuggestedResponses = db.suggested_responses;

const EmailAccountsData = [
  {
    email_provider: 'gmail',

    email_address: 'user1@gmail.com',

    password: 'user1gmailpassword',

    // type code here for "relation_one" field
  },

  {
    email_provider: 'outlook',

    email_address: 'user2@outlook.com',

    password: 'user2outlookpassword',

    // type code here for "relation_one" field
  },

  {
    email_provider: 'gmail',

    email_address: 'user3@gmail.com',

    password: 'user3gmailpassword',

    // type code here for "relation_one" field
  },
];

const EmailsData = [
  {
    subject: 'Welcome to AppWizzy!',

    body: "We're excited to have you on board.",

    received_at: new Date('2023-01-01T12:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_many" field
  },

  {
    subject: 'Your weekly summary',

    body: "Here's what happened this week.",

    received_at: new Date('2023-01-08T12:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_many" field
  },

  {
    subject: 'Special Offer',

    body: 'A special offer just for you.',

    received_at: new Date('2023-01-15T12:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_many" field
  },
];

const OrganizationsData = [
  {
    name: 'Tech Innovators',

    domain: 'techinnovators.com',

    // type code here for "relation_many" field
  },

  {
    name: 'Eco Warriors',

    domain: 'ecowarriors.org',

    // type code here for "relation_many" field
  },

  {
    name: 'Health Heroes',

    domain: 'healthheroes.net',

    // type code here for "relation_many" field
  },
];

const SuggestedResponsesData = [
  {
    response_text: 'Thank you for welcoming me!',

    // type code here for "relation_one" field
  },

  {
    response_text: 'Thanks for the summary, very useful!',

    // type code here for "relation_one" field
  },

  {
    response_text: "I'm interested in the offer, tell me more.",

    // type code here for "relation_one" field
  },
];

// Similar logic for "relation_many"

async function associateEmailAccountWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const EmailAccount0 = await EmailAccounts.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (EmailAccount0?.setUser) {
    await EmailAccount0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const EmailAccount1 = await EmailAccounts.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (EmailAccount1?.setUser) {
    await EmailAccount1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const EmailAccount2 = await EmailAccounts.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (EmailAccount2?.setUser) {
    await EmailAccount2.setUser(relatedUser2);
  }
}

async function associateEmailWithEmail_account() {
  const relatedEmail_account0 = await EmailAccounts.findOne({
    offset: Math.floor(Math.random() * (await EmailAccounts.count())),
  });
  const Email0 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Email0?.setEmail_account) {
    await Email0.setEmail_account(relatedEmail_account0);
  }

  const relatedEmail_account1 = await EmailAccounts.findOne({
    offset: Math.floor(Math.random() * (await EmailAccounts.count())),
  });
  const Email1 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Email1?.setEmail_account) {
    await Email1.setEmail_account(relatedEmail_account1);
  }

  const relatedEmail_account2 = await EmailAccounts.findOne({
    offset: Math.floor(Math.random() * (await EmailAccounts.count())),
  });
  const Email2 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Email2?.setEmail_account) {
    await Email2.setEmail_account(relatedEmail_account2);
  }
}

// Similar logic for "relation_many"

// Similar logic for "relation_many"

async function associateSuggestedResponseWithEmail() {
  const relatedEmail0 = await Emails.findOne({
    offset: Math.floor(Math.random() * (await Emails.count())),
  });
  const SuggestedResponse0 = await SuggestedResponses.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (SuggestedResponse0?.setEmail) {
    await SuggestedResponse0.setEmail(relatedEmail0);
  }

  const relatedEmail1 = await Emails.findOne({
    offset: Math.floor(Math.random() * (await Emails.count())),
  });
  const SuggestedResponse1 = await SuggestedResponses.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (SuggestedResponse1?.setEmail) {
    await SuggestedResponse1.setEmail(relatedEmail1);
  }

  const relatedEmail2 = await Emails.findOne({
    offset: Math.floor(Math.random() * (await Emails.count())),
  });
  const SuggestedResponse2 = await SuggestedResponses.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (SuggestedResponse2?.setEmail) {
    await SuggestedResponse2.setEmail(relatedEmail2);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await EmailAccounts.bulkCreate(EmailAccountsData);

    await Emails.bulkCreate(EmailsData);

    await Organizations.bulkCreate(OrganizationsData);

    await SuggestedResponses.bulkCreate(SuggestedResponsesData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateEmailAccountWithUser(),

      await associateEmailWithEmail_account(),

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      await associateSuggestedResponseWithEmail(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('email_accounts', null, {});

    await queryInterface.bulkDelete('emails', null, {});

    await queryInterface.bulkDelete('organizations', null, {});

    await queryInterface.bulkDelete('suggested_responses', null, {});
  },
};
