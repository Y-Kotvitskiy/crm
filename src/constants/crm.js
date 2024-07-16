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
  Contacts: {
    fields: [
      `first_name`,
      `last_name`,
      `parent_name`,
      `phone_work`,
      `date_entered`,
    ],
    sord: `name`,
  },
  Calls: {
    fields: [
      `name`,
      `parent_name`,
      `direction`,
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
