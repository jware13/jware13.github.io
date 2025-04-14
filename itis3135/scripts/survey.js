// add a javascript function that prevents the form from submitting without the necessary information

function validateForm() {
  var name = document.forms["surveyForm"]["name"].value;
  var email = document.forms["surveyForm"]["email"].value;
  var feedback = document.forms["surveyForm"]["feedback"].value;

  if (name == "" || email == "" || feedback == "") {
    alert("All fields must be filled out.");
    return false;
  }
  return true;
}

//Add a JavaScript function that will reset the progress of the form

function resetForm() {
  document.forms["surveyForm"].reset();
}

// Add a JavaScript function that will add new course text boxes

function addCourse() {
  var courseContainer = document.getElementById("courseContainer");
  var newCourse = document.createElement("input");
  newCourse.setAttribute("type", "text");
  newCourse.setAttribute("name", "course[]");
  newCourse.setAttribute("placeholder", "Enter course name");
  courseContainer.appendChild(newCourse);
}

//Add a JavaScript function that will add a delete button beside each new course text box

function addCourseWithDelete() {
  var courseContainer = document.getElementById("courseContainer");
  var newCourseDiv = document.createElement("div");
  var newCourse = document.createElement("input");
  newCourse.setAttribute("type", "text");
  newCourse.setAttribute("name", "course[]");
  newCourse.setAttribute("placeholder", "Enter course name");

  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete";
  deleteButton.type = "button";
  deleteButton.onclick = function () {
    courseContainer.removeChild(newCourseDiv);
  };

  newCourseDiv.appendChild(newCourse);
  newCourseDiv.appendChild(deleteButton);
  courseContainer.appendChild(newCourseDiv);
}

//When the user clicks 'Submit', use JavaScript to gather the data from the form and add content in place of the form.

function submitForm() {
  if (validateForm()) {
    var surveyContainer = document.getElementById("surveyContainer");
    surveyContainer.innerHTML = "";

    var name = document.forms["surveyForm"]["name"].value;
    var email = document.forms["surveyForm"]["email"].value;
    var feedback = document.forms["surveyForm"]["feedback"].value;

    var thankYouMessage = document.createElement("h2");
    thankYouMessage.innerHTML = "Thank You for Your Feedback!";
    surveyContainer.appendChild(thankYouMessage);

    var nameDisplay = document.createElement("p");
    nameDisplay.innerHTML = "Name: " + name;
    surveyContainer.appendChild(nameDisplay);

    var emailDisplay = document.createElement("p");
    emailDisplay.innerHTML = "Email: " + email;
    surveyContainer.appendChild(emailDisplay);

    var feedbackDisplay = document.createElement("p");
    feedbackDisplay.innerHTML = "Feedback: " + feedback;
    surveyContainer.appendChild(feedbackDisplay);

    var courses = document.forms["surveyForm"]["course[]"];
    if (courses.length > 0) {
      var coursesHeader = document.createElement("h3");
      coursesHeader.innerHTML = "Courses:";
      surveyContainer.appendChild(coursesHeader);
      var courseList = document.createElement("ul");
      for (var i = 0; i < courses.length; i++) {
        if (courses[i].value.trim() !== "") {
          var courseItem = document.createElement("li");
          courseItem.innerHTML = courses[i].value;
          courseList.appendChild(courseItem);
        }
      }
      surveyContainer.appendChild(courseList);
    }
  }
}

//There should still be a reset link at the bottom of the screen to reset the progress so that your website visitor can do it again.

function resetSurvey() {
  var surveyContainer = document.getElementById("surveyContainer");
  surveyContainer.innerHTML = `
    <form name="surveyForm" onsubmit="return submitForm()">
      <label for="name">Name:</label><br>
      <input type="text" name="name"><br>
      <label for="email">Email:</label><br>
      <input type="text" name="email"><br>
      <label for="feedback">Feedback:</label><br>
      <textarea name="feedback"></textarea><br>
      <div id="courseContainer"></div>
      <button type="button" onclick="addCourseWithDelete()">Add Course</button><br>
      <input type="submit" value="Submit">
      <button type="button" onclick="resetForm()">Reset</button>
    </form>
  `;
}
