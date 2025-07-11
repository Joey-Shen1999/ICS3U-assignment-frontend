import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';  // <-- 导入环境变量

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assignment-detail.html',
  styleUrls: ['./assignment-detail.scss']
})
export class AssignmentDetail implements OnInit {
  assignment: any = null;
  submissions: any[] = [];
  maxScore: number | null = null;
  showUpload = false;
  file: File | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get<any>(`${environment.apiUrl}/assignments/${id}`).subscribe({
        next: data => {
          this.assignment = data;
          // 你可以在这里查提交记录
          this.loadSubmissions(id);
        }
      });
    }
  }

  loadSubmissions(assignmentId: string) {
    this.http.get<any[]>(`${environment.apiUrl}/submissions/assignment/${assignmentId}`).subscribe({
      next: list => {
        this.submissions = list;
        // 计算最高成绩
        if (list.length > 0) {
          this.maxScore = Math.max(...list.map(x => x.score));
        }
      }
    });
  }

  downloadPDF() {
    window.open(`/uploads/${this.assignment.pdfPath}`, '_blank');
  }

  uploadFile(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  doUpload() {
    if (!this.file || !this.assignment) return;

    const user = JSON.parse(localStorage.getItem('user') || '{}'); // 或用你的 AuthService
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('assignmentId', this.assignment.id);
    formData.append('studentId', user.id);

    this.http.post(`${environment.apiUrl}/submissions/upload`, formData)
      .subscribe({
        next: (res) => {
          alert('上传成功');
          this.showUpload = false;
          this.loadSubmissions(this.assignment.id); // 刷新提交记录
        },
        error: () => alert('上传失败')
      });
  }

}
