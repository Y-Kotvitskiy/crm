const modulesCollection = [`AOS_Products`, `AOS_Invoices`, `Contacts`, `Calls`];
const defaultModules = [`AOS_Products`];
const defaultListSort = `name`;

const moduleList = {
  AOS_Invoices: {
    fields: [`number`, `name`, `status`,`shipping_address_city`, `phone_c`, `priority_c`, `total_amt`],
    sort: `-number`,
  },
  Accounts: {
    fields: [
      `phone_office`,
      `account_type`,
      `assigned_user_name`,
      `date_entered`,
    ],
    sort: `name`,
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
    sort: `name`,
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
    sort: `name`,
  },
  AOS_Products: {
    fields: [
      { type: `image`, name: `product_image` },
      `status_c`,
      { type: `money`, name: `price` },
      `description`,
    ],
    buttons: [{ type: `list_cart` }],
  },
};

const detailView = {
  defaultTitle: `name`,
  AOS_Invoices: {
    title: `number`,
    fields: [`name`, `status`, `phone_c`, `description`],
  },
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
      {
        type: `link`,
        id: `parent_id`,
        name: `parent_name`,
        module: `Accounts`,
      },
      "date_start",
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

const prioritySum = 8;

export {
  modulesCollection,
  defaultModules,
  defaultListSort,
  moduleList,
  detailView,
};

export { prioritySum };
