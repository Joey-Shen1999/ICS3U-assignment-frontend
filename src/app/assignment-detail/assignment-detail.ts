import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

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
          this.loadSubmissions(id);
        }
      });
    }
  }

  loadSubmissions(assignmentId: string) {
    this.http.get<any[]>(`${environment.apiUrl}/submissions/assignment/${assignmentId}`).subscribe({
      next: list => {
        this.submissions = list;
        if (list.length > 0) {
          this.maxScore = Math.max(...list.map(x => x.score));
        }
      }
    });
  }

  downloadPDF() {
    // 自动判断路径，兼容数据库里存 downloads/xxx.pdf 或 submissions/xxx.pdf
    let filePath = this.assignment?.pdfPath || this.assignment?.filePath;
    if (!filePath) {
      alert('找不到文件路径');
      return;
    }
    if (!filePath.startsWith('/uploads/')) {
      filePath = '/uploads/' + filePath.replace(/^\/+/, '');
    }
    window.open(filePath, '_blank');
  }

  uploadFile(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  doUpload() {
    if (!this.file || !this.assignment) return;

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('assignmentId', this.assignment.id);
    formData.append('studentId', user.id);

    this.http.post(`${environment.apiUrl}/submissions/upload`, formData)
      .subscribe({
        next: (res) => {
          alert('上传成功');
          this.showUpload = false;
          this.loadSubmissions(this.assignment.id);
        },
        error: () => alert('上传失败')
      });
  }
}
