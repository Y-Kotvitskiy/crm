const modulesCollection = [`Accounts`, `Contacts`, `Calls`];

const moduleList = {
  Accounts: {
    listFields: [
      `name`,
      `phone_office`,
      `account_type`,
      `assigned_user_name`,
      `date_entered`,
      `description`,
    ],
    sord: `name`,
  },
};

export { moduleList, modulesCollection };
