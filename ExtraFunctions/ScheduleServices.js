const Schedule = require("../modals/Schedule");
const axios = require("axios");

async function removetickets(id) {
  await axios
    .delete(`http://localhost:5000/api/Ticket/usertickets/${id}`)
    .then((res) => {
      console.log("ticket is removed");
    })
    .catch((err) => {
      console.log("Error in deleting tickets od users");
    });
}
async function updateSchedule(id) {
  await UpdateSlots({ slot1: id }, { $set: { slot1: null } });
  await UpdateSlots({ slot2: id }, { $set: { slot2: null } });
  await UpdateSlots({ slot3: id }, { $set: { slot3: null } });
  await DeleteNullSchedule();
}

async function UpdateSlots(query, updatedNull) {
  await Schedule.updateMany(query, updatedNull, function (err, res) {
    if (err) {
      console.log("not deleted");
      return;
    } else {
      console.log("result", res);
    }
  });
}
async function DeleteNullSchedule() {
  await Schedule.deleteMany(
    { slot1: null, slot2: null, slot3: null },
    function (err, res) {
      if (err) {
        console.log("not deletd");
        return;
      } else {
        console.log("result", res);
      }
    }
  );
}
module.exports.DeleteNullSchedule = DeleteNullSchedule;
module.exports.UpdateSlots = UpdateSlots;
module.exports.updateSchedule = updateSchedule;
module.exports.removetickets = removetickets;
