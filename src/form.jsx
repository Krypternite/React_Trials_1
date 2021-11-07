import React, { useImperativeHandle, useRef, useState } from "react";
import ReactDOM from "react-dom";

const StudentForm = (props, ref) => {
  let fileInput = null;
  const [fileSrc, setSrc] = useState();
  const [studentCount, setCount] = useState(1);

  useImperativeHandle(ref, () => ({
    input: () => fileInput,
    fileSrc: () => fileSrc.current,
    studentCount,
    setCount
  }));

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    var formData = new FormData(e.target);
    formData.forEach((a) => {
      console.log(a);
    });
  };

  const handleFileInput = (e) => {
    console.log(fileInput);
    const file = fileInput?.files?.[0];
    if (file) {
      var reader = new FileReader();
      reader.onloadend = function () {
        setSrc(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSrc(null);
    }
  };

  const onReset = () => {
    setSrc(null);
  };

  const newForm = () => {
    document.forms.student_form.reset();
  };

  return (
    <div>
      <h1>New Student Form </h1>
      {ReactDOM.createPortal(
        <button onClick={newForm}>New Form</button>,
        document.getElementById("portal")
      )}
      <form name="student_form" onSubmit={onSubmit} onReset={onReset}>
        <table>
          <tbody>
            <tr>
              <td>Student Count</td>
              <td>{studentCount}</td>
            </tr>
            <tr>
              <td>
                <label htmlFor="name_in">Student Name</label>
              </td>
              <td>
                <input name="name" id="name_in" />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="name_in">Class</label>
              </td>
              <td>
                <select name="class" id="class_sel">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((cls) => (
                    <option value={cls} key={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>
                <input type="radio" id="rad_male" name="gender" value="male" />
                <label htmlFor="rad_male">Male</label>
                <input
                  type="radio"
                  id="rad_fema"
                  name="gender"
                  value="female"
                />
                <label htmlFor="rad_fema">Female</label>
              </td>
            </tr>
            <tr>
              <td>Select Image</td>
              <td>
                <input
                  type="file"
                  ref={(ref) => {
                    fileInput = ref;
                  }}
                  accept="image/*"
                  onChange={handleFileInput}
                />
              </td>
            </tr>
            {fileSrc && (
              <tr>
                <td> Preview </td>
                <td>
                  <img height="100" alt="file" src={fileSrc} />
                </td>
              </tr>
            )}
            <tr>
              <td>
                <input type="submit" />
              </td>
              <td>
                <input type="reset" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default React.forwardRef(StudentForm);
