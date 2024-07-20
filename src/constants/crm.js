const modulesCollection = [`AOS_Products`, `Accounts`, `Contacts`, `Calls`];
const defaultModules = [`AOS_Products`];

const moduleList = {
  Accounts: {
    fields: [
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
      {
        type: `link`,
        id: `account_id`,
        name: `account_name`,
        module: `Accounts`,
      },
      `phone_work`,
      `date_entered`,
    ],
    sord: `name`,
  },
  Calls: {
    fields: [
      `name`,
      {
        type: `link`,
        id: `parent_id`,
        name: `parent_name`,
        module: `Accounts`,
      },
      `direction`,
      `date_entered`,
    ],
    sord: `name`,
  },
  AOS_Products: {
    fields: [
      { type: `image`, name: `product_image` },
      { type: `money`, name: `price` },
      `status_c`,
      `description`,
    ],
    buttons: [
      {
        title: `Add to card`,
        clickHandler: (id, module) => {
          console.log(`product id: `, id, `module`, module);
        },
      },
    ],
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
  Contacts: {
    fields: [
      `first_name`,
      `last_name`,
      {
        type: `link`,
        id: `account_id`,
        name: `account_name`,
        module: `Accounts`,
      },
      `phone_work`,
      `date_entered`,
      `description`,
    ],
  },
  Calls: {
    fields: [
      `direction`,
      "status",
      "date_start",
      { id: `parent_id`, name: `parent_name`, module: `Accounts` },
      `date_entered`,
      `description`,
    ],
  },
  AOS_Products: {
    fields: [
      { type: `image`, name: `product_image` },
      { type: `money`, name: `price` },
      `description`,
      `status_c`,
    ],
  },
};

export { modulesCollection, defaultModules, moduleList, detailView };
