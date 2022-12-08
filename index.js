process.on("unhandledRejection", (error) => {
  console.log(error);
});

// const Eris = require("eris");
// const config = require("./config.json");
// const bot = new Eris(config.token);

// bot.on("ready", () => {
//   console.log("I'm ready");
// });

// bot.on("messageCreate", async (msg) => {
//   if (msg.author.bot) return;
//   console.log(msg);
// });

// bot.connect();

const { Client } = require("eris");
const config = require("./config.json");
const { QuickDB } = require("quick.db");

var profileObj_init = {
  userName: "",
  characterName: "",
  quote: "",
  color: 4542399,
  category: [
    // {
    //   title: "",
    //   sections: [],
    // },
  ],
  stat: [
    // {
    //   name: "",
    //   text: [],
    // },
  ],
  face: "",
};

var profileObj = {
  userName: "Boreas",
  color: 4542399,
  characterName: "Eteraneaph Socrates",
  quote:
    "Some call adveruring a straining occupation. I consider it a boundless lifestyle!",
  category: [
    {
      title: "Race / Spaces",
      sections: ["Human"],
    },
    {
      title: "Gifts",

      sections: ["[GIFTLESS]"],
    },
    {
      title: "Celestial Core",

      sections: ["[CORE OF MIND]", "-Unawakened"],
    },
    {
      title: "Traits",

      sections: ["-INSTINCT: Flight", "-Glossipy", "-Photographic Memory"],
    },
    {
      title: "Extra's",

      sections: ["-Pattern Finder", "-High Metabolism"],
    },
    {
      title: "Bloodtype",
      sections: ["[B-]", "Normal Blood"],
    },
  ],
  stat: [
    {
      name: "Cabin selection",
      section: ["[1] The Cabin of Unity, ......"],
    },
  ],
  face: "https://cdn.discordapp.com/attachments/1036286362627883048/1037714997612138526/pexels-pixabay-163452.jpg",
};

const blockStart = "╒◖═══════════════════════◗╕";
const blockEnd = "╘◖═══════════════════════◗╛";
const client = new Client(`Bot ${config.token}`, {
  restMode: true,
  intents: ["guilds", "guildMembers", "guildMessages", "messageContent"],
});

const profileDB = new QuickDB({ filePath: "database/profile.sqlite" });

client.on("ready", async () => {
  console.log("Profiler is ready!");

  client.editStatus("online", {
    name: `Profile`,
    type: 3,
  });

  await client.bulkEditCommands([
    {
      name: "profile",
      description: "Show profile of user",
      options: [
        {
          name: "user",
          description: "User selection",
          type: 6,
          required: false,
        },
      ],
    },
    {
      name: "del-profile",
      description: "Delete profile of user",
      options: [
        {
          name: "user",
          description: "User selection",
          type: 6,
          required: false,
        },
      ],
    },
    {
      name: "hardreset",
      description: "Reset profile of user",
      options: [
        {
          name: "user",
          description: "User selection",
          type: 6,
          required: false,
        },
      ],
    },

    {
      name: "create-profile",
      description: "Create new profile for user",
      options: [
        {
          name: "user",
          description: "User selection",
          type: 6,
          required: false,
        },
      ],
    },
    {
      name: "preset-copy",
      type: 1,
      description: "Copy preset profile to other user",
      required: false,
      options: [
        {
          name: "from ",
          description: "copy profile from",
          type: 6,
          required: true,
        },
        {
          name: "to",
          description: "pasete profile to",
          type: 6,
          required: true,
        },
      ],
    },
    {
      name: "edit-profile",
      type: 1,
      description: "Edit profile",
      options: [
        {
          name: "name",
          description: "Edit profile name",
          type: 2,
          options: [
            {
              name: "add",
              description: "add profile name",
              type: 1,
              required: false,
              options: [
                {
                  name: "user",
                  description: "add profile stat",
                  type: 6,
                  required: true,
                },
                {
                  name: "name",
                  description: "name of character",
                  type: 3,
                  required: true,
                },
              ],
            },
            {
              name: "edit",
              description: "edit profile name",
              type: 1,
              required: false,
              options: [
                {
                  name: "user",
                  description: "user for editing profile",
                  type: 6,
                  required: true,
                },
                {
                  name: "name",
                  description: "name to edit",
                  type: 3,
                  required: true,
                },
              ],
            },
            {
              name: "delete",
              description: "delete profile name",
              type: 1,
              required: false,
              options: [
                {
                  name: "user",
                  description: "user for editing profile",
                  type: 6,
                  required: true,
                },
              ],
            },
          ],
        },
        {
          name: "quote",
          description: "Edit profile quote",
          type: 2,
          options: [
            {
              name: "add",
              description: "add profile quote",
              type: 1,
              required: false,
              options: [
                {
                  name: "user",
                  description: "user for editing quote",
                  type: 6,
                  required: true,
                },
                {
                  name: "content",
                  description: "content to add",
                  type: 3,
                  required: true,
                },
              ],
            },
            {
              name: "edit",
              description: "edit profile quote",
              type: 1,
              required: false,
              options: [
                {
                  name: "user",
                  description: "user for editing quote",
                  type: 6,
                  required: true,
                },
                {
                  name: "content",
                  description: "content to add",
                  type: 3,
                  required: true,
                },
              ],
            },
            {
              name: "delete",
              description: "delete profile quote",
              type: 1,
              required: false,
              options: [
                {
                  name: "user",
                  description: "user for editing quote",
                  type: 6,
                  required: true,
                },
              ],
            },
          ],
        },
        {
          name: "stat",
          description: "Edit profile stat",
          type: 2,
          options: [
            {
              name: "add",
              description: "add profile stat",
              type: 1,
              required: false,
              options: [
                {
                  name: "user",
                  description: "user for adding stat",
                  type: 6,
                  required: true,
                },
                {
                  name: "name",
                  description: "name to add",
                  type: 3,
                  required: true,
                },
              ],
            },
            {
              name: "edit",
              description: "edit profile stat",
              type: 1,
              required: false,
              options: [
                {
                  name: "user",
                  description: "user for adding stat",
                  type: 6,
                  required: true,
                },
                {
                  name: "name",
                  description: "name to edit",
                  type: 3,
                  required: true,
                },
                {
                  name: "content",
                  description: "content to edit",
                  type: 3,
                  required: true,
                },
              ],
            },
            {
              name: "delete",
              description: "delete profile stat",
              type: 1,
              required: false,
              options: [
                {
                  name: "user",
                  description: "user for deleting stat",
                  type: 6,
                  required: true,
                },
                {
                  name: "name",
                  description: "name to delete",
                  type: 3,
                  required: true,
                },
              ],
            },
          ],
        },
        {
          name: "category",
          description: "Edit profile category",
          type: 2,
          options: [
            {
              name: "add",
              description: "add profile category",
              type: 1,
              required: false,
              options: [
                {
                  name: "user",
                  description: "user for adding category",
                  type: 6,
                  required: true,
                },
                {
                  name: "name",
                  description: "name to add",
                  type: 3,
                  required: true,
                },
              ],
            },
            {
              name: "edit",
              description: "edit profile category",
              type: 1,
              required: false,
              options: [
                {
                  name: "user",
                  description: "user for adding category",
                  type: 6,
                  required: true,
                },
                {
                  name: "name",
                  description: "name to edit",
                  type: 3,
                  required: true,
                },
                {
                  name: "content",
                  description: "content to edit",
                  type: 3,
                  required: true,
                },
              ],
            },
            {
              name: "delete",
              description: "delete profile category",
              type: 1,
              required: false,
              options: [
                {
                  name: "user",
                  description: "user for deleting category",
                  type: 6,
                  required: true,
                },
                {
                  name: "name",
                  description: "name to delete",
                  type: 3,
                  required: true,
                },
              ],
            },
          ],
        },
        {
          name: "face",
          description: "Edit profile face",
          type: 2,
          options: [
            {
              name: "add",
              description: "add profile face",
              type: 1,
              required: false,
              options: [
                {
                  name: "user",
                  description: "add profile face",
                  type: 6,
                  required: true,
                },
                {
                  name: "url",
                  description: "url of face",
                  type: 3,
                  required: true,
                },
              ],
            },
            {
              name: "edit",
              description: "edit profile face",
              type: 1,
              required: false,
              options: [
                {
                  name: "user",
                  description: "edit profile face",
                  type: 6,
                  required: true,
                },
                {
                  name: "url",
                  description: "url of face",
                  type: 3,
                  required: true,
                },
              ],
            },
            {
              name: "delete",
              description: "delete profile face",
              type: 1,
              required: false,
              options: [
                {
                  name: "user",
                  description: "edit profile face",
                  type: 6,
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "profile-colour",
      description: "Set color of the profile",
      options: [
        {
          name: "color",
          description: "integer value of the color",
          type: 3,
          required: false,
        },
      ],
    },
  ]);
});

client.on("error", (e) => {
  console.log(e);
});

client.on("interactionCreate", async (interaction) => {
  // console.log(JSON.stringify(interaction));

  //.hasPermission("ADMINISTRATOR")

  var isAdminUser = false;

  let msg = interaction.channel.messages.get(interaction.channel.lastMessageID);
  if (msg) {
    let guildID = msg.guildID;
    interaction.member.roles.forEach((role) => {
      if (
        client.guilds
          .get(guildID)
          .roles.get(role)
          .permissions.has("administrator")
      ) {
        isAdminUser = true;
      }
    });
  }

  console.log("you are admin ", isAdminUser);

  if (interaction.data.name == "profile-colour") {
    // var guildId = interaction.channel.messages.get(
    //   interaction.channel.lastMessageID
    // ).guildID;

    // console.log(client.guilds.get(guildId).roles);

    if (interaction.data.options) {
      user = interaction.member.user;

      var profile = await profileDB.get(
        user.username + "#" + user.discriminator
      );

      if (profile) {
        profile.color = Number(interaction.data.options[0].value);
        await profileDB.set(user.username + "#" + user.discriminator, profile);
        interaction.createMessage({
          embeds: [
            {
              color: 4542399,
              title: "Profile color changed",
            },
          ],
        });
      } else {
        interaction.createMessage({
          embeds: [
            {
              color: 4542399,
              title:
                "Not found profile for @" +
                user.username +
                "#" +
                user.discriminator,
            },
          ],
        });
      }

      return;
    } else {
      interaction.createMessage({
        embeds: [
          {
            color: 16711680,
            title: "Invalid parameters",
          },
        ],
      });
      return;
    }
  }

  if (interaction.data.name == "preset-copy") {
    let userSrc;
    let userDst;
    if (interaction.data.options.length == 2) {
      userSrc = client.users.get(interaction.data.options[0].value);
      if (interaction.member.roles.includes(config.adminRoleID))
        userDst = client.users.get(interaction.data.options[1].value);
      else userDst = interaction.member.user;

      var profileSrc = await profileDB.get(
        userSrc.username + "#" + userSrc.discriminator
      );
      if (!profileSrc) {
        interaction.createMessage({
          embeds: [
            {
              color: 16711680,
              title:
                "No exist profile for @" +
                userSrc.username +
                "#" +
                userSrc.discriminator,
            },
          ],
        });
        return;
      }
      profileSrc.userName = userDst.username;
      await profileDB.set(
        userDst.username + "#" + userDst.discriminator,
        profileSrc
      );

      interaction.createMessage({
        embeds: [
          {
            color: 4542399,
            title:
              "Success copy profile from @" +
              userSrc.username +
              "#" +
              userSrc.discriminator +
              " to @" +
              userDst.username +
              "#" +
              userDst.discriminator,
          },
        ],
      });
      return;
    } else {
      interaction.createMessage({
        embeds: [
          {
            color: 16711680,
            title: "Invalid arguments",
          },
        ],
      });
      return;
    }
  }
  if (interaction.data.name == "edit-profile") {
    // if (interaction.member.roles.includes(config.adminRoleID))
    {
      if (interaction.data.options.length > 0) {
        var option = interaction.data.options[0];
        switch (option.name) {
          case "name":
            {
              if (option.options.length > 0) {
                var option2 = option.options[0];

                switch (option2.name) {
                  case "add":
                    {
                      if (option2.options.length > 0) {
                        var option3 = option2.options[0];
                        var option4 = option2.options[1];

                        // console.log(option2);

                        let user;
                        if (option3) {
                          user = client.users.get(option3.value);
                        } else {
                          user = interaction.member.user;
                        }

                        profile = await profileDB.get(
                          user.username + "#" + user.discriminator
                        );

                        if (!profile) {
                          interaction.createMessage({
                            embeds: [
                              {
                                color: 16711680,
                                title: "No profile existing",
                              },
                            ],
                          });
                          return;
                        }

                        if (
                          isAdminUser ||
                          profile.userName == interaction.member.user.username
                        ) {
                          profile.characterName = option4.value;
                          await profileDB.set(
                            user.username + "#" + user.discriminator,
                            profile
                          );
                        } else {
                          interaction.createMessage({
                            embeds: [
                              {
                                color: 16711680,
                                title: "You have no admin permission",
                              },
                            ],
                          });
                          return;
                        }
                      }
                    }
                    break;
                  case "edit":
                    {
                      if (option2.options.length > 0) {
                        var option3 = option2.options[0];
                        var option4 = option2.options[1];

                        // console.log(option2);

                        let user;
                        if (option3) {
                          user = client.users.get(option3.value);
                        } else {
                          user = interaction.member.user;
                        }

                        profile = await profileDB.get(
                          user.username + "#" + user.discriminator
                        );

                        if (!profile) {
                          interaction.createMessage({
                            embeds: [
                              {
                                color: 16711680,
                                title: "No profile existing",
                              },
                            ],
                          });
                          return;
                        }

                        if (
                          isAdminUser ||
                          profile.userName == interaction.member.user.username
                        ) {
                          profile.characterName = option4.value;
                          await profileDB.set(
                            user.username + "#" + user.discriminator,
                            profile
                          );
                        } else {
                          interaction.createMessage({
                            embeds: [
                              {
                                color: 16711680,
                                title: "You have no admin permission",
                              },
                            ],
                          });
                          return;
                        }
                      }
                    }
                    break;
                  case "delete":
                    {
                      if (option2.options.length > 0) {
                        var option3 = option2.options[0];

                        // console.log(option2);

                        let user;
                        if (option3) {
                          user = client.users.get(option3.value);
                        } else {
                          user = interaction.member.user;
                        }

                        profile = await profileDB.get(
                          user.username + "#" + user.discriminator
                        );

                        if (!profile) {
                          interaction.createMessage({
                            embeds: [
                              {
                                color: 16711680,
                                title: "No profile existing",
                              },
                            ],
                          });
                          return;
                        }

                        if (
                          isAdminUser ||
                          profile.userName == interaction.member.user.username
                        ) {
                          profile.characterName = "";
                          await profileDB.set(
                            user.username + "#" + user.discriminator,
                            profile
                          );
                        } else {
                          interaction.createMessage({
                            embeds: [
                              {
                                color: 16711680,
                                title: "You have no admin permission",
                              },
                            ],
                          });
                          return;
                        }
                      }
                    }
                    break;
                }
              }
            }
            break;
          case "quote":
            {
              if (option.options.length > 0) {
                var option2 = option.options[0];
                switch (option2.name) {
                  case "add":
                    {
                      if (option2.options.length > 0) {
                        var option3 = option2.options[0];
                        var option4 = option2.options[1];

                        // console.log(option2);

                        let user;
                        if (option3) {
                          user = client.users.get(option3.value);
                        } else {
                          user = interaction.member.user;
                        }

                        profile = await profileDB.get(
                          user.username + "#" + user.discriminator
                        );

                        if (!profile) {
                          interaction.createMessage({
                            embeds: [
                              {
                                color: 16711680,
                                title: "No profile existing",
                              },
                            ],
                          });
                          return;
                        }

                        if (
                          isAdminUser ||
                          profile.userName == interaction.member.user.username
                        ) {
                          profile.quote = option4.value;
                          await profileDB.set(
                            user.username + "#" + user.discriminator,
                            profile
                          );
                        } else {
                          interaction.createMessage({
                            embeds: [
                              {
                                color: 16711680,
                                title: "You have no admin permission",
                              },
                            ],
                          });
                          return;
                        }
                      }
                    }
                    break;
                  case "edit":
                    {
                      if (option2.options.length > 0) {
                        var option3 = option2.options[0];
                        var option4 = option2.options[1];

                        // console.log(option2);

                        let user;
                        if (option3) {
                          user = client.users.get(option3.value);
                        } else {
                          user = interaction.member.user;
                        }

                        profile = await profileDB.get(
                          user.username + "#" + user.discriminator
                        );

                        if (!profile) {
                          interaction.createMessage({
                            embeds: [
                              {
                                color: 16711680,
                                title: "No profile existing",
                              },
                            ],
                          });
                          return;
                        }

                        if (
                          // interaction.member.roles.includes(
                          //   config.adminRoleID
                          // ) ||
                          isAdminUser ||
                          profile.userName == interaction.member.user.username
                        ) {
                          profile.quote = option4.value;
                          await profileDB.set(
                            user.username + "#" + user.discriminator,
                            profile
                          );
                        } else {
                          interaction.createMessage({
                            embeds: [
                              {
                                color: 16711680,
                                title: "You have no admin permission",
                              },
                            ],
                          });
                          return;
                        }
                      }
                    }
                    break;
                  case "delete":
                    {
                      if (option2.options.length > 0) {
                        var option3 = option2.options[0];

                        // console.log(option2);

                        let user;
                        if (option3) {
                          user = client.users.get(option3.value);
                        } else {
                          user = interaction.member.user;
                        }

                        profile = await profileDB.get(
                          user.username + "#" + user.discriminator
                        );

                        if (!profile) {
                          interaction.createMessage({
                            embeds: [
                              {
                                color: 16711680,
                                title: "No profile existing",
                              },
                            ],
                          });
                          return;
                        }

                        if (
                          isAdminUser ||
                          profile.userName == interaction.member.user.username
                        ) {
                          profile.quote = "";
                          await profileDB.set(
                            user.username + "#" + user.discriminator,
                            profile
                          );
                        } else {
                          interaction.createMessage({
                            embeds: [
                              {
                                color: 16711680,
                                title: "You have no admin permission",
                              },
                            ],
                          });
                          return;
                        }
                      }
                    }
                    break;
                }
              }
            }
            break;
          case "category":
            {
              if (option.options.length > 0) {
                var option2 = option.options[0];
                switch (option2.name) {
                  case "add":
                    {
                      if (option2.options.length > 0) {
                        var option3 = option2.options[0];
                        var option4 = option2.options[1];

                        // console.log(option2);

                        let user;
                        if (option3) {
                          user = client.users.get(option3.value);
                        } else {
                          user = interaction.member.user;
                        }

                        profile = await profileDB.get(
                          user.username + "#" + user.discriminator
                        );

                        if (!profile) {
                          interaction.createMessage({
                            embeds: [
                              {
                                color: 16711680,
                                title: "No profile existing",
                              },
                            ],
                          });
                          return;
                        }

                        if (
                          isAdminUser ||
                          profile.userName == interaction.member.user.username
                        ) {
                          profile.category = [
                            ...profile.category,
                            { title: option4.value, sections: [] },
                          ];

                          await profileDB.set(
                            user.username + "#" + user.discriminator,
                            profile
                          );
                        } else {
                          interaction.createMessage({
                            embeds: [
                              {
                                color: 16711680,
                                title: "You have no admin permission",
                              },
                            ],
                          });
                          return;
                        }
                      }
                    }
                    break;
                  case "edit":
                    {
                      if (option2.options.length > 0) {
                        var option3 = option2.options[0];
                        var option4 = option2.options[1];
                        var option5 = option2.options[2];

                        // console.log(option2);

                        let user;
                        if (option3) {
                          user = client.users.get(option3.value);
                        } else {
                          user = interaction.member.user;
                        }

                        profile = await profileDB.get(
                          user.username + "#" + user.discriminator
                        );

                        if (!profile) {
                          interaction.createMessage({
                            embeds: [
                              {
                                color: 16711680,
                                title: "No profile existing",
                              },
                            ],
                          });
                          return;
                        }

                        if (
                          isAdminUser ||
                          profile.userName == interaction.member.user.username
                        ) {
                          profile.category = profile.category.map((item) => {
                            if (item.title === option4.value) {
                              item.sections = [...item.sections, option5.value];
                              return item;
                            }
                            return item;
                          });

                          await profileDB.set(
                            user.username + "#" + user.discriminator,
                            profile
                          );
                        } else {
                          interaction.createMessage({
                            embeds: [
                              {
                                color: 16711680,
                                title: "You have no admin permission",
                              },
                            ],
                          });
                          return;
                        }
                      }
                    }
                    break;
                  case "delete":
                    {
                      if (option2.options.length > 0) {
                        var option3 = option2.options[0];
                        var option4 = option2.options[1];
                        // console.log(option2);

                        let user;
                        if (option3) {
                          user = client.users.get(option3.value);
                        } else {
                          user = interaction.member.user;
                        }

                        profile = await profileDB.get(
                          user.username + "#" + user.discriminator
                        );

                        if (!profile) {
                          interaction.createMessage({
                            embeds: [
                              {
                                color: 16711680,
                                title: "No profile existing",
                              },
                            ],
                          });
                          return;
                        }

                        if (
                          isAdminUser ||
                          profile.userName == interaction.member.user.username
                        ) {
                          var categories = profile.category.filter((item) => {
                            return item.title != option4.value;
                          });
                          profile.category = [...categories];

                          await profileDB.set(
                            user.username + "#" + user.discriminator,
                            profile
                          );
                        } else {
                          interaction.createMessage({
                            embeds: [
                              {
                                color: 16711680,
                                title: "You have no admin permission",
                              },
                            ],
                          });
                          return;
                        }
                      }
                    }
                    break;
                }
              }
            }
            break;
          case "stat":
            {
              if (option.options.length > 0) {
                var option2 = option.options[0];
                switch (option2.name) {
                  case "add":
                    {
                      if (option2.options.length > 0) {
                        var option3 = option2.options[0];
                        var option4 = option2.options[1];

                        // console.log(option2);

                        let user;
                        if (option3) {
                          user = client.users.get(option3.value);
                        } else {
                          user = interaction.member.user;
                        }

                        profile = await profileDB.get(
                          user.username + "#" + user.discriminator
                        );

                        if (!profile) {
                          interaction.createMessage({
                            embeds: [
                              {
                                color: 16711680,
                                title: "No profile existing",
                              },
                            ],
                          });
                          return;
                        }

                        if (
                          isAdminUser ||
                          profile.userName == interaction.member.user.username
                        ) {
                          profile.stat = [
                            ...profile.stat,
                            { name: option4.value, section: [] },
                          ];

                          await profileDB.set(
                            user.username + "#" + user.discriminator,
                            profile
                          );
                        } else {
                          interaction.createMessage({
                            embeds: [
                              {
                                color: 16711680,
                                title: "You have no admin permission",
                              },
                            ],
                          });
                          return;
                        }
                      }
                    }
                    break;
                  case "edit":
                    {
                      if (option2.options.length > 0) {
                        var option3 = option2.options[0];
                        var option4 = option2.options[1];
                        var option5 = option2.options[2];

                        // console.log(option2);

                        let user;
                        if (option3) {
                          user = client.users.get(option3.value);
                        } else {
                          user = interaction.member.user;
                        }

                        profile = await profileDB.get(
                          user.username + "#" + user.discriminator
                        );

                        if (!profile) {
                          interaction.createMessage({
                            embeds: [
                              {
                                color: 16711680,
                                title: "No profile existing",
                              },
                            ],
                          });
                          return;
                        }

                        if (
                          isAdminUser ||
                          profile.userName == interaction.member.user.username
                        ) {
                          profile.stat = profile.stat.map((item) => {
                            if (item.name === option4.value) {
                              item.section = [...item.section, option5.value];
                              return item;
                            }
                            return item;
                          });

                          await profileDB.set(
                            user.username + "#" + user.discriminator,
                            profile
                          );
                        } else {
                          interaction.createMessage({
                            embeds: [
                              {
                                color: 16711680,
                                title: "You have no admin permission",
                              },
                            ],
                          });
                          return;
                        }
                      }
                    }
                    break;
                  case "delete":
                    {
                      if (option2.options.length > 0) {
                        var option3 = option2.options[0];
                        var option4 = option2.options[1];
                        // console.log(option2);

                        let user;
                        if (option3) {
                          user = client.users.get(option3.value);
                        } else {
                          user = interaction.member.user;
                        }

                        profile = await profileDB.get(
                          user.username + "#" + user.discriminator
                        );

                        if (!profile) {
                          interaction.createMessage({
                            embeds: [
                              {
                                color: 16711680,
                                title: "No profile existing",
                              },
                            ],
                          });
                          return;
                        }

                        if (
                          isAdminUser ||
                          profile.userName == interaction.member.user.username
                        ) {
                          var stat = profile.stat.filter((item) => {
                            return item.name != option4.value;
                          });
                          profile.stat = [...stat];

                          await profileDB.set(
                            user.username + "#" + user.discriminator,
                            profile
                          );
                        } else {
                          interaction.createMessage({
                            embeds: [
                              {
                                color: 16711680,
                                title: "You have no admin permission",
                              },
                            ],
                          });
                          return;
                        }
                      }
                    }
                    break;
                }
              }
            }
            break;
          case "face":
            {
              if (option.options.length > 0) {
                var option2 = option.options[0];
                switch (option2.name) {
                  case "add":
                    {
                      if (option2.options.length > 0) {
                        var option3 = option2.options[0];
                        var option4 = option2.options[1];

                        // console.log(option2);

                        let user;
                        if (option3) {
                          user = client.users.get(option3.value);
                        } else {
                          user = interaction.member.user;
                        }

                        profile = await profileDB.get(
                          user.username + "#" + user.discriminator
                        );
                        if (!profile) {
                          interaction.createMessage({
                            embeds: [
                              {
                                color: 16711680,
                                title: "No profile existing",
                              },
                            ],
                          });
                          return;
                        }

                        if (
                          isAdminUser ||
                          profile.userName == interaction.member.user.username
                        ) {
                          profile.face = option4.value;
                          await profileDB.set(
                            user.username + "#" + user.discriminator,
                            profile
                          );
                        } else {
                          interaction.createMessage({
                            embeds: [
                              {
                                color: 16711680,
                                title: "You have no admin permission",
                              },
                            ],
                          });
                          return;
                        }
                      }
                    }
                    break;
                  case "edit":
                    {
                      if (option2.options.length > 0) {
                        var option3 = option2.options[0];
                        var option4 = option2.options[1];

                        // console.log(option2);

                        let user;
                        if (option3) {
                          user = client.users.get(option3.value);
                        } else {
                          user = interaction.member.user;
                        }

                        profile = await profileDB.get(
                          user.username + "#" + user.discriminator
                        );
                        if (!profile) {
                          interaction.createMessage({
                            embeds: [
                              {
                                color: 16711680,
                                title: "No profile existing",
                              },
                            ],
                          });
                          return;
                        }

                        if (
                          isAdminUser ||
                          profile.userName == interaction.member.user.username
                        ) {
                          profile.face = option4.value;
                          await profileDB.set(
                            user.username + "#" + user.discriminator,
                            profile
                          );
                        } else {
                          interaction.createMessage({
                            embeds: [
                              {
                                color: 16711680,
                                title: "You have no admin permission",
                              },
                            ],
                          });
                          return;
                        }
                      }
                    }
                    break;
                  case "delete":
                    {
                      if (option2.options.length > 0) {
                        var option3 = option2.options[0];
                        var option4 = option2.options[1];

                        // console.log(option2);

                        let user;
                        if (option3) {
                          user = client.users.get(option3.value);
                        } else {
                          user = interaction.member.user;
                        }

                        profile = await profileDB.get(
                          user.username + "#" + user.discriminator
                        );
                        if (!profile) {
                          interaction.createMessage({
                            embeds: [
                              {
                                color: 16711680,
                                title: "No profile existing",
                              },
                            ],
                          });
                          return;
                        }
                        if (
                          isAdminUser ||
                          profile.userName == interaction.member.user.username
                        ) {
                          profile.face = "";
                          await profileDB.set(
                            user.username + "#" + user.discriminator,
                            profile
                          );
                        } else {
                          interaction.createMessage({
                            embeds: [
                              {
                                color: 16711680,
                                title: "You have no admin permission",
                              },
                            ],
                          });
                          return;
                        }
                      }
                    }
                    break;
                }
              }
            }
            break;
        }
      }
      interaction.createMessage({
        embeds: [
          {
            color: 4542399,
            title: "Request Completed",
          },
        ],
      });
    }
  }
  if (interaction.data.name == "del-profile") {
    // if (interaction.member.roles.includes(config.adminRoleID))
    {
      let user;
      if (interaction.data.options) {
        user = client.users.get(interaction.data.options[0].value);
      } else {
        user = interaction.member.user;
      }
      var profile = await profileDB.get(
        user.username + "#" + user.discriminator
      );

      if (!profile) {
        interaction.createMessage({
          embeds: [
            {
              color: 16711680,
              title: "No profile existing",
            },
          ],
        });
        return;
      }

      // check admin role or user him self
      if (
        isAdminUser ||
        (profile && profile.userName == interaction.member.user.username)
      ) {
        await profileDB.delete(user.username + "#" + user.discriminator);

        interaction.createMessage({
          embeds: [
            {
              color: 16711680,
              title:
                "Deleted profile for @" +
                user.username +
                "#" +
                user.discriminator,
            },
          ],
        });
      } else {
        interaction.createMessage({
          embeds: [
            {
              color: 16711680,
              title: "You have no admin permission",
            },
          ],
        });
      }
    }
  }

  if (interaction.data.name == "hardreset") {
    let user;
    if (interaction.data.options) {
      user = client.users.get(interaction.data.options[0].value);
    } else {
      user = interaction.member.user;
    }

    // if (interaction.member.roles.includes(config.adminRoleID))
    {
      var profile = await profileDB.get(
        user.username + "#" + user.discriminator
      );

      if (!profile) {
        interaction.createMessage({
          embeds: [
            {
              color: 16711680,
              title: "No profile existing",
            },
          ],
        });
        return;
      }

      // check admin role or user him self
      if (
        isAdminUser ||
        (profile && profile.userName == interaction.member.user.username)
      ) {
        await profileDB.set(
          user.username + "#" + user.discriminator,
          profileObj_init
        );
        interaction.createMessage({
          embeds: [
            {
              color: 4542399,
              title:
                "Reset profile for @" +
                user.username +
                "#" +
                user.discriminator,
            },
          ],
        });
      } else {
        interaction.createMessage({
          embeds: [
            {
              color: 16711680,
              title: "You have no admin permission",
            },
          ],
        });
      }
    }
  }
  if (interaction.data.name == "create-profile") {
    let user;
    if (interaction.data.options) {
      user = client.users.get(interaction.data.options[0].value);
    } else {
      user = interaction.member.user;
    }

    // if (interaction.member.roles.includes(config.adminRoleID))
    {
      if (!interaction.member.roles.includes(config.adminRoleID))
        user = interaction.member.user;

      const myProfile = await profileDB.get(
        user.username + "#" + user.discriminator
      );
      if (myProfile) {
        interaction.createMessage({
          embeds: [
            {
              color: 4542399,
              title:
                "Profile exists for " +
                  (user.username + "#" + user.discriminator) || "Unknown#0000",
            },
          ],
        });
      } else {
        var newProfile = profileObj_init;
        newProfile.userName = user.username;
        await profileDB.set(
          user.username + "#" + user.discriminator,
          newProfile
        );

        interaction.createMessage({
          embeds: [
            {
              color: 16711680,
              title:
                "New profile created for " +
                  (user.username + "#" + user.discriminator) ||
                "Unknown#0000" + "\nPlease add new contents to the profile.",
            },
          ],
        });
      }
    }
  }

  if (interaction.data.name == "profile") {
    let user;
    if (interaction.data.options) {
      user = client.users.get(interaction.data.options[0].value);
    } else {
      user = interaction.member.user;
    }

    const myProfile = await profileDB.get(
      user.username + "#" + user.discriminator
    );

    if (myProfile) {
      // console.log(myProfile);
      var resProfile = generateProfileUI(myProfile);
      // await interaction.reply("Loading...");
      await interaction.createMessage(resProfile);
    } else {
      await interaction.createMessage({
        embeds: [
          {
            color: 4542399,
            title:
              "No profile for " + (user.username + "#" + user.discriminator) ||
              "Unknown#0000",
          },
        ],
      });
    }
  }
});

client.on("messageCreate", async (msg) => {
  // console.log(msg);
  if (msg.author.bot) return;
  if (msg.content.startsWith(config.PREFIX) == false) return; //  check content is command with prefix

  let args = msg.content.substring(config.PREFIX.length).split(" ");

  if (args[0] == "help-profile") {
    msg.channel.createMessage({
      embeds: [
        {
          color: 4542399,
          title: "Help",
          fields: [
            {
              name: "show profile",
              value: "/profile [user]",
            },
            {
              name: "create profile",
              value: "/create-profile [user]",
            },
            {
              name: "Reset profile",
              value: "/hardreset [user]",
            },
            {
              name: "delete profile",
              value: "/del-profile [user]",
            },
            {
              name: "copy profile",
              value: "/preset-copy [user] [user]",
            },
            {
              name: "change profile color",
              value: "/profile-colour [color]",
            },
            {
              name: "edit profile",
              value:
                "/edit-profile name add user[user] name[name]\n" +
                "/edit-profile name edit user[user] name[name]\n" +
                "/edit-profile name delete user[user]\n" +
                "/edit-profile quote add user[user] content[content]\n" +
                "/edit-profile quote edit user[user] content[content]\n" +
                "/edit-profile quote delete user[user]\n" +
                "/edit-profile category add user[user] name[name]\n" +
                "/edit-profile category edit user[user] name[name] content[content]\n" +
                "/edit-profile category delete user[user] name[name]\n" +
                "/edit-profile stat add user[user] name[name]\n" +
                "/edit-profile stat edit user[user] name[name] content[content]\n" +
                "/edit-profile stat delete user[user] name[name]\n" +
                "/edit-profile face add user[user] url[url]\n" +
                "/edit-profile face edit user[user] url[url]\n" +
                "/edit-profile face delete user[user]\n",
            },
          ],
        },
      ],
    });
  }
});

let generateProfileUI = (profile) => {
  var objRes = {
    content: profile.userName + "'s profile",
    embeds: [
      {
        title: profile.characterName,
        description: blockStart + "\n     " + profile.quote + "\n" + blockEnd,
        color: profile.color ? Number(profile.color) : 4542399,
        fields: [
          ...(profile.category.length > 0
            ? profile.category.map((val) => {
                return {
                  name: val.title,
                  value:
                    val.sections.length > 0
                      ? val.sections.join("\n")
                      : "Unknown\n",
                  inline: true,
                };
              })
            : []),
          ...(profile.stat.length > 0
            ? profile.stat.map((stat) => {
                return {
                  name: stat.name,
                  value:
                    stat.section.length > 0
                      ? stat.section.join("\n")
                      : "Unknown\n",
                  inline: false,
                };
              })
            : []),
        ],
        image: {
          url: profile.face,
        },
      },
    ],
  };

  return objRes;
};

client.connect();
