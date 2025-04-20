function validateForm(e) {
  e.preventDefault();

  const requiredFields = [
    "name",
    "mascot",
    "image",
    "image-caption",
    "personal-background",
    "professional-background",
    "academic-background",
    "platform",
    "funny-thing",
    "anything-else"
  ];

  let isValid = true;
  for (let id of requiredFields) {
    const field = document.getElementById(id);
    if (!field || field.value.trim() === "") {
      alert(`Please fill out the ${id.replace(/-/g, " ")} field.`);
      isValid = false;
    }
  }

  const agreement = document.getElementById("agreement");
  if (!agreement.checked) {
    alert("You must agree to the contract before submitting.");
    isValid = false;
  }

  if (!isValid) return;

  // Gather values
  const name = document.getElementById("name").value;
  const mascot = document.getElementById("mascot").value;
  const imageInput = document.getElementById("image");
  const imageCaption = document.getElementById("image-caption").value;
  const personalBackground = document.getElementById(
    "personal-background"
  ).value;
  const professionalBackground = document.getElementById(
    "professional-background"
  ).value;
  const academicBackground = document.getElementById(
    "academic-background"
  ).value;
  const platform = document.getElementById("platform").value;
  const funnyThing = document.getElementById("funny-thing").value;
  const anythingElse = document.getElementById("anything-else").value;

  const courseFields = document.querySelectorAll(".course-input");
  const courseDescriptions = document.querySelectorAll(".course-description");

  const courses = Array.from(courseFields).map((input, i) => {
    const name = input.value;
    const description = courseDescriptions[i]
      ? courseDescriptions[i].value
      : "";

    return `${name} - ${description}`;
  });

  // Show results
  let resultHTML = `
    <h2>Introduction Form Results</h2>
    <ul>
      <li><strong>Name:</strong> ${name}</li>
      <li><strong>Mascot:</strong> ${mascot}</li>`;

  if (imageInput.files[0]) {
    const imgURL = URL.createObjectURL(imageInput.files[0]);
    resultHTML += `<li><strong>Image:</strong> <img src="${imgURL}" alt="${imageCaption}" style="max-width:200px;" /></li>`;
  }

  resultHTML += `
      <li><strong>Image Caption:</strong> ${imageCaption}</li>
      <li><strong>Personal Background:</strong> ${personalBackground}</li>
      <li><strong>Professional Background:</strong> ${professionalBackground}</li>
      <li><strong>Academic Background:</strong> ${academicBackground}</li>
      <li><strong>Platform:</strong> ${platform}</li>
    </ul>
    <h3>Courses:</h3>
    <ul>`;

  if (courses.length > 0) {
    // resultHTML += `<h3>Courses:</h3><ul>`;
    courses.forEach((course) => {
      const [courseName, courseDescription] = course.split(" - ");
      resultHTML += `<li><strong>${courseName}:</strong> ${courseDescription}</li>`;
    });
  }

  resultHTML += `
    </ul>
    <ul>
      <li><strong>Funny Thing:</strong> ${funnyThing}</li>
      <li><strong>Anything Else:</strong> ${anythingElse}</li>
    </ul>
    <button class="result-reset-btn" type="reset" onclick="resetForm()">Reset</button>`;
  document.getElementById("intro-form").style.display = "none";
  document.getElementById("results").innerHTML = resultHTML;
}

document.getElementById("intro-form").addEventListener("submit", validateForm);

//reset function
function resetForm() {
  const form = document.getElementById("intro-form");

  const courseFields = document.querySelectorAll(".course-field");
  courseFields.forEach((field) => field.remove());

  document.getElementById("results").innerHTML = "";
  form.style.display = "block";

  document.getElementById("name").value = "Jacob Ware";
  document.getElementById("mascot").value = "Jolly Wallaby";
  document.getElementById("image").value = "";
  document.getElementById("image-caption").value =
    "Me snorkeling in the British Virgin Islands";
  document.getElementById("personal-background").value =
    "I am from Holly Springs, North Carolina and I have lived there most of my life. Moved to Charlotte recently to attend college";
  document.getElementById("professional-background").value = "None";
  document.getElementById("academic-background").value =
    "Sophomore in Computer Science with Data Science concentration";
  document.getElementById("web-background").value = "None";
  document.getElementById("platform").value = "Macbook";
  document.getElementById("funny-thing").value =
    "I am colorblind and I think it only gets worse";
  document.getElementById("anything-else").value = "anything else?";
  document.getElementById("agreement").checked = false;
}

function addCourseField() {
  const div = document.createElement("div");
  div.className = "course-field";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Course Name";
  input.className = "course-input";

  const courseDescriptionInput = document.createElement("input");
  courseDescriptionInput.type = "text";
  courseDescriptionInput.placeholder = "Course Description";
  courseDescriptionInput.className = "course-description";

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete-button";
  deleteButton.type = "button";
  deleteButton.onclick = () => div.remove();

  div.appendChild(input);
  div.appendChild(courseDescriptionInput);
  div.appendChild(deleteButton);
  document.getElementById("courses-container").appendChild(div);
}
