class NaryNode {
  constructor(title, link, component) {
    this.title = title;
    this.link = link;
    this.component = component;
    this.children = [];
  }

  addChild(node) {
    this.children.push(node);
  }
}

class NaryTree {
  constructor() {
    this.root = null;
  }

  setRoot(node) {
    this.root = node;
  }
}

const buildMenuTree = () => {
  const tree = new NaryTree();

  const root = new NaryNode("Dashboard", "/dashboard", "DashboardPage");

  const profile = new NaryNode("Profile", "/profile", "ProfilePage");
  profile.addChild(new NaryNode("My Info", "/profile/info", "MyInfoPage"));
  profile.addChild(new NaryNode("Avatar", "/profile/avatar", "AvatarPage"));

  const messages = new NaryNode("Messages", "/messages", "MessagesPage");
  messages.addChild(new NaryNode("Inbox", "/messages/inbox", "InboxPage"));
  messages.addChild(new NaryNode("Sent", "/messages/sent", "SentPage"));
  messages.addChild(new NaryNode("Drafts", "/messages/drafts", "DraftsPage"));

  const settings = new NaryNode("Settings", "/settings", "SettingsPage");
  const account = new NaryNode("Account", "/settings/account", "AccountPage");
  const security = new NaryNode("Security & Privacy", "/settings/security", "SecurityPage");

  security.addChild(new NaryNode("Password", "/settings/security/password", "PasswordPage"));
  security.addChild(new NaryNode("Two Factor Auth", "/settings/security/2fa", "TwoFactorPage"));

  account.addChild(new NaryNode("Billing", "/settings/account/billing", "BillingPage"));
  account.addChild(new NaryNode("Notifications", "/settings/account/notifications", "NotificationsPage"));

  settings.addChild(account);
  settings.addChild(security);

  const help = new NaryNode("Help", "/help", "HelpPage");
  help.addChild(new NaryNode("FAQ's", "/help/faqs", "FaqsPage"));
  help.addChild(new NaryNode("Submit a Ticket", "/help/ticket", "TicketPage"));
  help.addChild(new NaryNode("Network Status", "/help/network", "NetworkPage"));

  const logout = new NaryNode("Logout", "/logout", "LogoutPage");

  root.addChild(profile);
  root.addChild(messages);
  root.addChild(settings);
  root.addChild(help);
  root.addChild(logout);

  tree.setRoot(root);
  return tree;
};

export { NaryNode, NaryTree, buildMenuTree };