const modulesCollection = [`Accounts`, `Contacts`, `Calls`, `Employees`];

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
      { id: `account_id`, name: `account_name`, module: `Accounts` },
      `phone_work`,
      `date_entered`,
    ],
    sord: `name`,
  },
  Calls: {
    fields: [`name`, {id: `parent_id`, name:`parent_name`, module: `Accounts`}, `direction`, `date_entered`],
    sord: `name`,
  },
};

const detailView = {
  defaultTitle: `name`,
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

export { modulesCollection, moduleList, detailView };
