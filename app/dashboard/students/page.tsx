"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Pencil, ChevronLeft, ChevronRight } from "lucide-react";
import { get, getDatabase, onValue, push, ref, remove, update } from "firebase/database";
import { db } from "@/environment";

interface Student {
  id: number;
  name: string;
  email: string;
  studentId: string;
  class: string;
  speciality: string;
  year: string;
  phone: string;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [newStudent, setNewStudent] = useState<Student>({
    id: 0,
    studentId: '',
    class: '',
    name: '',
    email: '',
    phone: '',
    speciality: '',
    year: '',
  });

  const specialties = ['Informatique', 'Réseaux', 'Cybersécurité', 'Intelligence Artificielle', 'Data Science'];
  const years = ['2023-2024', '2024-2025'];
  const itemsPerPage = 5;
  const fetchUsers = (setStudents: React.Dispatch<React.SetStateAction<Student[]>>, setFilteredStudents: React.Dispatch<React.SetStateAction<Student[]>>) => {
    const db = getDatabase();
    const usersRef = ref(db, 'students');
  
  
      onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const users: Student[] = data ? Object.values(data) : [];
      console.log('Data from Firebase:', data);
      
      setStudents(users);
      setFilteredStudents(users);
    });
  };
  useEffect(() => {
    fetchUsers(setStudents, setFilteredStudents);
  }, []);
  const handleAddStudent = async () => {
    if (editingStudent) {
      setStudents(
        students.map((student) =>
          student.id === editingStudent.id
            ? { ...student, ...newStudent }
            : student
        )
      );
      setEditingStudent(null);
    } else {
      const newStudentWithId: Student = {
        ...newStudent,
        id: students.length + 1,
        studentId: '', // Add a default value or generate a unique ID
        class: '', // Add a default value or prompt user for input
        speciality: newStudent.speciality || '', // Assuming 'specialty' should map to 'speciality'
        name: newStudent.name || '',
        email: newStudent.email || '',
        year: newStudent.year || '',
        phone: newStudent.phone || ''
      };
      setStudents([...students, newStudentWithId]);
      try {
        // Add student to Realtime Database
        const studentRef = ref(db, 'students');
        await push(studentRef, newStudentWithId);

        // Update local state
        alert('Student added successfully');
      } catch (error) {
        console.error('Error adding student:', error);
        alert('Failed to add student');
      }
    }
    setNewStudent({
      id: 0,
      studentId: '',
      class: '',
      name: '',
      email: '',
      phone: '',
      speciality: '',
      year: '',
    });
    setIsDialogOpen(false);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setNewStudent({
      id: student.id,
      studentId: student.studentId,
      class: student.class,
      name: student.name,
      email: student.email,
      phone: student.phone,
      speciality: student.speciality,
      year: student.year,
    });
    setIsDialogOpen(true);
    handleUpdateStudent(student);
  };

  const handleUpdateStudent = async (editingStudent: Student) => {
    if (editingStudent) {
      const db = getDatabase();
      const studentsRef = ref(db, "students");
  
      try {
        // Step 1: Fetch all students to find the Firebase key by studentId
        const snapshot = await get(studentsRef);
        if (snapshot.exists()) {
          const studentsData = snapshot.val();
  
          // Step 2: Find the Firebase key where studentId matches
          const firebaseKey = Object.keys(studentsData).find(
            (key) => studentsData[key].studentId === editingStudent.studentId
          );
  
          if (!firebaseKey) {
            console.error("Student not found with studentId:", editingStudent.studentId);
            return;
          }
  
          // Step 3: Update the specific student using the Firebase key
          const studentRef = ref(db, `students/${firebaseKey}`);
  
          await update(studentRef, editingStudent);
          console.log("Student updated successfully!");
  
          // Step 4: Update local state
          setStudents(
            students.map((student) =>
              student.studentId === editingStudent.studentId ? editingStudent : student
            )
          );
  
          // setEditingStudent(null);
        } else {
          console.error("No students found in the database.");
        }
      } catch (error) {
        console.error("Error updating student:", error);
      }
    }
  };
  
  const handleDeleteStudent = async (studentId: string) => {
    setStudents(students.filter((student) => student.studentId !== studentId));
    const db = getDatabase();
    const studentsRef = ref(db, "students");
  
    try {
      // Step 1: Fetch all students to find the Firebase key by studentId
      const snapshot = await get(studentsRef);
      if (snapshot.exists()) {
        const studentsData = snapshot.val();
  
        // Step 2: Find the Firebase key where studentId matches
        const firebaseKey = Object.keys(studentsData).find(
          (key) => studentsData[key].studentId === studentId
        );
  
        if (!firebaseKey) {
          console.error("Student not found with studentId:", studentId);
          return;
        }
  
        // Step 3: Delete the student using the Firebase key
        const studentRef = ref(db, `students/${firebaseKey}`);
        await remove(studentRef);
        console.log("Student deleted successfully!");
  
        // Step 4: Update local state to remove the student from the list
        setStudents(students.filter((student) => student.studentId !== studentId));
      } else {
        console.error("No students found in the database.");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingStudent(null);
    setNewStudent({
      id: 0,
      studentId: '',
      name: "",
      email: "",
      phone: "",
      speciality: "",
      year: "",
      class: ''
    });
  };

  const filteredStudentsList = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (specialtyFilter === "all" || student.speciality === specialtyFilter)
  );

  const totalPages = Math.ceil(filteredStudentsList.length / itemsPerPage);
  const paginatedStudents = filteredStudentsList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto px-4">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Student Management
          </h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="gradient-bg border-0 hover:opacity-90"
                onClick={() => {
                  setEditingStudent(null);
                  setNewStudent({
                    id: 0,
                    studentId: '',
                    name: "",
                    email: "",
                    phone: "",
                    speciality: "",
                    year: "",
                    class: ''
                  });
                  setIsDialogOpen(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-card" onInteractOutside={handleDialogClose}>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {editingStudent ? "Edit Student" : "Add New Student"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Input
                  placeholder="Name"
                  value={newStudent.name}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, name: e.target.value })
                  }
                  className="border-indigo-100 focus:border-indigo-300"
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={newStudent.email}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, email: e.target.value })
                  }
                  className="border-indigo-100 focus:border-indigo-300"
                />
                <Input
                  placeholder="Phone"
                  value={newStudent.phone}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, phone: e.target.value })
                  }
                  className="border-indigo-100 focus:border-indigo-300"
                />
                <Select
                  value={newStudent.speciality}
                  onValueChange={(value) =>
                    setNewStudent({ ...newStudent, speciality: value })
                  }
                >
                  <SelectTrigger className="border-indigo-100">
                    <SelectValue placeholder="Select Specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={newStudent.year}
                  onValueChange={(value) =>
                    setNewStudent({ ...newStudent, year: value })
                  }
                >
                  <SelectTrigger className="border-indigo-100">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleAddStudent} className="w-full gradient-bg border-0 hover:opacity-90">
                  {editingStudent ? "Update Student" : "Add Student"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-indigo-400" />
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-indigo-100 focus:border-indigo-300"
            />
          </div>
          <Select
            value={specialtyFilter}
            onValueChange={setSpecialtyFilter}
          >
            <SelectTrigger className="w-[200px] border-indigo-100">
              <SelectValue placeholder="Filter by Specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specialties</SelectItem>
              {specialties.map((specialty) => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="glass-card rounded-lg shadow-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-indigo-50 to-purple-50">
                <TableHead className="font-semibold text-indigo-900">Name</TableHead>
                <TableHead className="font-semibold text-indigo-900">Email</TableHead>
                <TableHead className="font-semibold text-indigo-900">Phone</TableHead>
                <TableHead className="font-semibold text-indigo-900">Specialty</TableHead>
                <TableHead className="font-semibold text-indigo-900">Year</TableHead>
                <TableHead className="text-right font-semibold text-indigo-900">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedStudents.map((student) => (
                <TableRow key={student.id} className="hover:bg-indigo-50/50">
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.phone}</TableCell>
                  <TableCell>{student.speciality}</TableCell>
                  <TableCell>{student.year}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditStudent(student)}
                      className="border-indigo-200 hover:bg-indigo-100"
                    >
                      <Pencil className="h-4 w-4 text-indigo-600" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteStudent(student.studentId)}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {paginatedStudents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-indigo-400">
                    No students found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-indigo-100">
              <div className="flex items-center gap-2">
                <p className="text-sm text-indigo-600">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredStudentsList.length)} of {filteredStudentsList.length} results
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="border-indigo-200 hover:bg-indigo-100"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? "gradient-bg border-0" : "border-indigo-200 hover:bg-indigo-100"}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="border-indigo-200 hover:bg-indigo-100"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}