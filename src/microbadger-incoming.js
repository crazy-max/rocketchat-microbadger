/**
 * microbadger-incoming.js
 * Add MicroBadger Docker image changes notifications via a new WebHook in Rocket.Chat
 * @license MIT
 * @version 0.1
 * @author  CrazyMax, https://github.com/crazy-max
 * @updated 2018-10-14
 * @link    https://github.com/crazy-max/rocketchat-microbadger
 */

/* globals console, _, s */

const USERNAME = 'MicroBadger';
const AVATAR_URL = 'https://raw.githubusercontent.com/crazy-max/rocketchat-microbadger/master/res/avatar.png';

const makeField = (title, tags) => {
  let tagsStr = '';
  tags.forEach(function(tag) {
    if (tagsStr !== '') tagsStr += `, `;
    tagsStr += tag.tag;
  });
  return {
    title: title,
    value: tagsStr
  };
};

/* exported Script */
class Script {
  /**
   * @params {object} request
   */
  process_incoming_request({ request }) {
    let data = request.content;
    let fields = [];
    if (request.content.new_tags.length > 0) {
      fields.push(makeField("New tags", request.content.new_tags));
    }
    if (request.content.changed_tags.length > 0) {
      fields.push(makeField("Changed tags", request.content.changed_tags));
    }
    if (request.content.deleted_tags.length > 0) {
      fields.push(makeField("Deleted tags", request.content.deleted_tags));
    }
    return {
      content:{
        username: USERNAME,
        icon_url: AVATAR_URL,
        text: data.text,
        attachments: [{
          fields: fields
        }]
      }
    };
  }
}
