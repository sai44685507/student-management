import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './StudentsPage.css';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    class: '',
    section: '',
    rollNumber: '',
    address: '',
    phoneNumber: '',
    email: '',
    parentName: '',
    parentPhone: '',
    admissionDate: '',
    dateOfBirth: '',
    gender: '',
  });
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [viewStudent, setViewStudent] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState(new Set());

  useEffect(() => {
    const fetchStudents = async () => {
      const studentsCollection = collection(db, 'students');
      const studentSnapshot = await getDocs(studentsCollection);
      const studentList = studentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStudents(studentList);
    };

    fetchStudents();
  }, []);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'students'), newStudent);
      toast.success('Student added successfully!');
      setNewStudent({
        name: '',
        class: '',
        section: '',
        rollNumber: '',
        address: '',
        phoneNumber: '',
        email: '',
        parentName: '',
        parentPhone: '',
        admissionDate: '',
        dateOfBirth: '',
        gender: '',
      });
      setModalOpen(false);
      // Refresh the student list
      const studentsCollection = collection(db, 'students');
      const studentSnapshot = await getDocs(studentsCollection);
      const studentList = studentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStudents(studentList);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await deleteDoc(doc(db, 'students', id));
      toast.success('Student deleted successfully!');
      // Refresh the student list
      const studentsCollection = collection(db, 'students');
      const studentSnapshot = await getDocs(studentsCollection);
      const studentList = studentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStudents(studentList);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteSelectedStudents = async () => {
    for (const id of selectedStudents) {
      await handleDeleteStudent(id);
    }
    setSelectedStudents(new Set());
    setDeleteModalOpen(false);
  };

  const handleViewStudent = (student) => {
    setViewStudent(student);
  };

  const toggleSelectStudent = (id) => {
    const updatedSelection = new Set(selectedStudents);
    if (updatedSelection.has(id)) {
      updatedSelection.delete(id);
    } else {
      updatedSelection.add(id);
    }
    setSelectedStudents(updatedSelection);
  };

  return (
    <div>
      <ToastContainer />
      <h2>Students List</h2>
      <button className = 'btn' onClick={() => setModalOpen(true)}>Add Student</button>
      <button onClick={() => setDeleteModalOpen(true)}>Delete Students</button>
      {modalOpen && (
        <div className="modal">
          <h3>Add New Student</h3>
          <form onSubmit={handleAddStudent}>
            <input type="text" placeholder="Name" value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} required />
            <input type="text" placeholder="Class" value={newStudent.class} onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })} required />
            {/* <input type="text" placeholder="Section" value={newStudent.section} onChange={(e) => setNewStudent({ ...newStudent, section: e.target.value })} required />
            <input type="text" placeholder="Roll Number" value={newStudent.rollNumber} onChange={(e) => setNewStudent({ ...newStudent, rollNumber: e.target.value })} required />
            <input type="text" placeholder="Address" value={newStudent.address} onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })} required /> */}
            <input type="text" placeholder="Phone Number" value={newStudent.phoneNumber} onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,10}$/.test(value)) {
                setNewStudent({ ...newStudent, phoneNumber: value });
              }
            }} required />
            {/* <input type="text" placeholder="Class" value={newStudent.class} onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,4}$/.test(value) && value >= 1900 && value <= new Date().getFullYear()) {
                setNewStudent({ ...newStudent, class: value });
              }
            }} required /> */}

            <input type="text" placeholder="Section" value={newStudent.section} onChange={(e) => setNewStudent({ ...newStudent, section: e.target.value })} required />
            <input type="text" placeholder="Roll Number" value={newStudent.rollNumber} onChange={(e) => setNewStudent({ ...newStudent, rollNumber: e.target.value })} required />
            <input type="text" placeholder="Address" value={newStudent.address} onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })} required />
            {/* <input type="text" placeholder="Phone Number" value={newStudent.phoneNumber} onChange={(e) => setNewStudent({ ...newStudent, phoneNumber: e.target.value })} required /> */}
            <input type="email" placeholder="Email" value={newStudent.email} onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })} required />
            <input type="text" placeholder="Parent's Name" value={newStudent.parentName} onChange={(e) => setNewStudent({ ...newStudent, parentName: e.target.value })} required />
            <input type="text" placeholder="Parent's Phone" value={newStudent.parentPhone} onChange={(e) => setNewStudent({ ...newStudent, parentPhone: e.target.value })} required />
            <br/>
           
            <label>Date of Birth</label>
            <input type="date" value={newStudent.dateOfBirth} onChange={(e) => {
              const value = e.target.value;
              const date = new Date(value);
              if (date.getFullYear() >= 1900 && date.getFullYear() <= new Date().getFullYear() && date.getDate() >= 1 && date.getDate() <= 31 && date.getMonth() >= 0 && date.getMonth() < 12) {
                setNewStudent({ ...newStudent, dateOfBirth: value });
              }
            }} required />
            <label>Admission Date</label>
            <input type="date" value={newStudent.admissionDate} onChange={(e) => {
              const value = e.target.value;
              const dob = new Date(newStudent.dateOfBirth);
              const admissionDate = new Date(value);
              if (admissionDate >= new Date(dob.setFullYear(dob.getFullYear() + 10))) {
                setNewStudent({ ...newStudent, admissionDate: value });
              }
            }} required />

           
            <select value={newStudent.gender} onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value })} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setModalOpen(false)}>Cancel</button>
            {error && <p className="error">{error}</p>}
          </form>
        </div>
      )}
      {deleteModalOpen && (
        <div className="modal">
          <h3>Select Students to Delete</h3>
          <table>
            <thead>
              <tr>
                <th>Select</th>
                <th>ID</th>
                <th>Name</th>
                <th>Class</th>
                <th>Section</th>
                <th>Roll Number</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map(student => (
                  <tr key={student.id}>
                    <td>
                      <input type="checkbox" checked={selectedStudents.has(student.id)} onChange={() => toggleSelectStudent(student.id)} />
                    </td>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.class}</td>
                    <td>{student.section}</td>
                    <td>{student.rollNumber}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No records available</td>
                </tr>
              )}
            </tbody>
          </table>
          <button className='btn' onClick={handleDeleteSelectedStudents}>Confirm Deletion</button>
          <button onClick={() => setDeleteModalOpen(false)}>Cancel</button>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Section</th>
            <th>Roll Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.class}</td>
                <td>{student.section}</td>
                <td>{student.rollNumber}</td>
                <td>
                  <button className='btn' onClick={() => handleViewStudent(student)}>View</button><span>
                  <button onClick={() => handleDeleteStudent(student.id)}>Delete</button>
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No records available</td>
            </tr>
          )}
        </tbody>
      </table>
      {viewStudent && (
        <div className="modal">
          <h3>Student Details</h3>
          <p>Name: {viewStudent.name}</p>
          <p>Class: {viewStudent.class}</p>
          <p>Section: {viewStudent.section}</p>
          <p>Roll Number: {viewStudent.rollNumber}</p>
          <button onClick={() => setViewStudent(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default StudentsPage;
