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

  {
    email_provider: 'smtp',

    email_address: 'user4@example.com',

    password: 'user4smtppassword',

    // type code here for "relation_one" field
  },

  {
    email_provider: 'gmail',

    email_address: 'admin@example.com',

    password: 'admingmailpassword',

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

  {
    subject: 'Security Alert',

    body: 'Unusual activity detected on your account.',

    received_at: new Date('2023-01-22T12:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_many" field
  },

  {
    subject: 'Thank you',

    body: 'Thank you for being a loyal user.',

    received_at: new Date('2023-01-29T12:00:00Z'),

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

  {
    name: 'Education Enthusiasts',

    domain: 'educationenthusiasts.edu',

    // type code here for "relation_many" field
  },

  {
    name: 'Finance Gurus',

    domain: 'financegurus.info',

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

  {
    response_text: "I've updated my security settings, thanks!",

    // type code here for "relation_one" field
  },

  {
    response_text: "It's my pleasure, thank you too!",

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

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const EmailAccount3 = await EmailAccounts.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (EmailAccount3?.setUser) {
    await EmailAccount3.setUser(relatedUser3);
  }

  const relatedUser4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const EmailAccount4 = await EmailAccounts.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (EmailAccount4?.setUser) {
    await EmailAccount4.setUser(relatedUser4);
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

  const relatedEmail_account3 = await EmailAccounts.findOne({
    offset: Math.floor(Math.random() * (await EmailAccounts.count())),
  });
  const Email3 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Email3?.setEmail_account) {
    await Email3.setEmail_account(relatedEmail_account3);
  }

  const relatedEmail_account4 = await EmailAccounts.findOne({
    offset: Math.floor(Math.random() * (await EmailAccounts.count())),
  });
  const Email4 = await Emails.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Email4?.setEmail_account) {
    await Email4.setEmail_account(relatedEmail_account4);
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

  const relatedEmail3 = await Emails.findOne({
    offset: Math.floor(Math.random() * (await Emails.count())),
  });
  const SuggestedResponse3 = await SuggestedResponses.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (SuggestedResponse3?.setEmail) {
    await SuggestedResponse3.setEmail(relatedEmail3);
  }

  const relatedEmail4 = await Emails.findOne({
    offset: Math.floor(Math.random() * (await Emails.count())),
  });
  const SuggestedResponse4 = await SuggestedResponses.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (SuggestedResponse4?.setEmail) {
    await SuggestedResponse4.setEmail(relatedEmail4);
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
