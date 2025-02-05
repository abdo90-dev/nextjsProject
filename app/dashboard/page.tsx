"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Users, BookOpen, School } from "lucide-react";

export default function DashboardOverview() {
  const stats = [
    {
      title: "Total Students",
      value: "2,856",
      icon: Users,
      description: "Active enrollments",
    },
    {
      title: "Specialties",
      value: "4",
      icon: GraduationCap,
      description: "Available programs",
    },
    {
      title: "Courses",
      value: "124",
      icon: BookOpen,
      description: "Across all specialties",
    },
    {
      title: "Facilities",
      value: "12",
      icon: School,
      description: "Campus buildings",
    },
  ];

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to School Management System</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Manage your school's students, courses, and resources from this central dashboard.
              Navigate through different sections using the sidebar menu.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              • View and manage student records
            </p>
            <p className="text-sm text-muted-foreground">
              • Add new students to the system
            </p>
            <p className="text-sm text-muted-foreground">
              • Update student information
            </p>
            <p className="text-sm text-muted-foreground">
              • Search and filter student data
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}