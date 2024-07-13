const modulesCollection = [`Accounts`, `Contacts`, `Calls`];

const moduleList = {
  Accounts: {
    fields: [
      `name`,
      `phone_office`,
      `account_type`,
      `assigned_user_name`,
      `date_entered`,
    ],
    sord: `name`,
  },
};

const detailView = {
  Accounts: {
    fields: [
      `name`,
      `phone_office`,
      `account_type`,
      `assigned_user_name`,
      `date_entered`,
      `description`,
    ],
  },
};

export { modulesCollection, moduleList,detailView };
