import PocketBase from "https://cdn.jsdelivr.net/npm/pocketbase@0.21.3/dist/pocketbase.es.mjs";

const pb = new PocketBase("http://127.0.0.1:8090");

// after the above you can also access the auth data from the authStore
console.log(pb.authStore.isValid);
console.log(pb.authStore.token);
console.log(pb.authStore);
function checkAuthStatus() {
  if (pb.authStore.isValid) {
    // The token is valid and hasn't expired yet.
    console.log("User is currently authenticated:", pb.authStore.model.record);
    // You can now safely make API calls that require authentication.
  } else {
    // The token is either missing or expired.
    console.log("No valid token found. User is logged out.");
    // Redirect to the login page.
  }
}
checkAuthStatus();

// A simple function to check and display current auth status (not used in your current HTML but good to keep)

// --- Event Listener to Hook into the Form ---

function displayUserData() {
  // 1. Check if a user is logged in
  if (pb.authStore.isValid) {
    // 2. Access the user's record data
    const user = pb.authStore;
  } else {
    console.log("No user is currently logged in.");
  }
}
displayUserData();

let infop = document.querySelector(".infop");
let logoutBut = document.querySelector(".logout");
let hardlogin = document.querySelector(".hardlogin");
logoutBut.addEventListener("dblclick", () => {
  pb.authStore.clear();
});
hardlogin.addEventListener("dblclick", async () => {
  const authData = await pb
    .collection("users")
    .authWithPassword("alok@gmail.com", "alookool");
});
infop = document.querySelector(".infop");

infop.innerHTML = JSON.stringify(pb.authStore.model);
infop.innerHTML += "<br><br><br><br>";
console.log(await pb.collection("courses").getList());

async function updateUserName(newName) {
  // 1. Check if the user is authenticated
  if (!pb.authStore.isValid) {
    console.error("User is not logged in. Cannot update data.");
    return;
  }

  // 2. Get the current user's ID from the auth store
  const currentUserId = pb.authStore.model.id;

  // 3. Define the data fields to update
  const updateData = {
    name: newName,
  };

  try {
    // The SDK automatically uses the stored auth token for this request.
    const updatedRecord = await pb
      .collection("users")
      .update(currentUserId, updateData);

    console.log("User name updated successfully:", updatedRecord);
    alert(`Name changed to: ${updatedRecord.name}`);

    // Optional: The auth store model needs to be manually updated if the record is the current user
    // pb.authStore.save(pb.authStore.token, updatedRecord);
  } catch (error) {
    console.error("Data update failed:", error);
    // This usually means the user lacks the necessary permission (Collection Rule issue)
    alert(`Failed to update data: ${error.response?.message}`);
  }
}
// updateUserName("testing")
// Example usage:
// updateUserName("New Username");
async function updateC(courseId, newE, newM) {
  // 1. Define the data payload you want to send
  const data = {
    // "name":name,
    enrolled: newE,
    maxenrolled: newM,
    // You can add any other fields you want to change here
  };

  try {
    // 2. Call the update method
    const updatedRecord = await pb.collection("courses").update(courseId, data);

    // 3. Success handling
    console.log("✅ Course updated successfully!");
    console.log("Updated Record Data:", updatedRecord);

    return updatedRecord;
  } catch (error) {
    // 4. Error handling
    console.error(
      "❌ Failed to update course:",
      error.response.message || error
    );
    alert(
      `Update failed: ${error.response.message || "Check console for details."}`
    );
  }
}
// updateC("j8ts9em1d7zev1s", 15, 20)
async function updatelink(newName) {
  // 1. Check if the user is authenticated
  if (!pb.authStore.isValid) {
    console.error("User is not logged in. Cannot update data.");
    return;
  }

  // 2. Get the current user's ID from the auth store
  const currentUserId = pb.authStore.model.id;

  // 3. Define the data fields to update
  const updateData = {
    verified: newName,
  };

  try {
    // The SDK automatically uses the stored auth token for this request.
    const updatedRecord = await pb
      .collection("users")
      .update(currentUserId, updateData);

    console.log("User name updated successfully:", updatedRecord);
    alert(`Name changed to: ${updatedRecord.name}`);

    // Optional: The auth store model needs to be manually updated if the record is the current user
    // pb.authStore.save(pb.authStore.token, updatedRecord);
  } catch (error) {
    console.error("Data update failed:", error);
    // This usually means the user lacks the necessary permission (Collection Rule issue)
    alert(`Failed to update data: ${error.response?.message}`);
  }
}
async function addStudentToCourse(courseId, studentId) {
  if (!pb.authStore.isValid) {
    console.error("User not authenticated. Please log in.");
    return;
  }

  try {
    // 1. Fetch the current course record to get the existing student list
    const currentCourse = await pb.collection("courses").getOne(courseId, {
      // Only fetch the necessary field to minimize data transfer
      fields: "students",
    });

    // 2. Get the existing list of student IDs. Default to an empty array.
    let currentStudents = currentCourse.students || [];

    // 3. Check for duplicates (optional, but good practice)
    if (currentStudents.includes(studentId)) {
      console.warn(
        `Student ID ${studentId} is already enrolled in course ID: ${courseId}`
      );
      return currentCourse;
    }

    // 4. Add the new student ID to the array
    currentStudents.push(studentId);

    // 5. Prepare the data payload with the *new, complete* array
    // NOTE: PocketBase requires sending the entire list for updates.
    const data = {
      students: currentStudents,
    };

    // 6. Update the course record with the new list of relations
    const updatedCourse = await pb.collection("courses").update(courseId, data);

    console.log(
      `✅ Successfully enrolled student ${studentId} into course: ${courseId}`
    );
    console.log("Updated Student List:", updatedCourse.students);

    return updatedCourse;
  } catch (error) {
    console.error(
      "❌ Failed to update course relations:",
      error.response.message || error
    );

    if (error.status === 403) {
      console.error(
        "Permission Denied: Check the 'Update Rule' on the 'courses' collection."
      );
    } else if (error.status === 404) {
      console.error("Not Found: Check if the course ID is correct.");
    }
  }
}
// addStudentToCourse("4z3orleeqz5nky1", "pg64vez9voieoph")
console.log("here")

//   if (!pb.authStore.isValid) {
//     console.error("User not authenticated. Cannot join subject.");
//     return;
//   }

//   // 1. Define the endpoint and the data payload
//   const endpoint = "/subjects/join";
//   const payload = {
//     // The key 'subject' must match the key used in your hook:
//     // const SubjectID = ($apis.requestInfo(c).data).subject;
//     subject: subjectId,
//   };

//   try {
//     // 1. Force a refresh to ensure the token is absolutely current
//     await pb.collection("users").authRefresh();

//     // 2. Define the endpoint and the data payload
//     const endpoint = "/subjects/join";


//     // 3. Send the request
//     const response = await pb.send(endpoint, {
//       method: "POST",
//       body: {
//     // The key 'subject' must match the key used in your hook:
//     // const SubjectID = ($apis.requestInfo(c).data).subject;
//     subject: subjectId,
//   },
//     });
//   } catch (error) {
//     // Handle HTTP errors (401, 404, 500 etc.)
//     console.error("❌ Failed to send request to custom endpoint:", error);

//     // Log the specific error message from the server if available
//     if (error.response && error.response.message) {
//       console.error("Server Message:", error.response.message);
//     }
//   }
// }

// Then try calling joinSubject(TARGET_SUBJECT_ID); again.
// joinSubject("j8ts9em1d7zev1s");
async function tryit(x){
 
   try {
    const response = await pb.send("/api/try", {
        method: "POST",
        // Pass the JavaScript object here. pb.send() handles JSON conversion.
        x:"hello",
    });

    // console.log("Success:", response);

} catch (error) {
    console.error("Error sending data:", error);
}
}
tryit()
