#!/usr/bin/env python3
"""
Script to reorganize sections in the HTML file
"""

# Read the HTML file
with open('/Users/rohithkumar/Documents/MySites/FSM-Mys/index.html', 'r') as f:
    content = f.read()

# Split into sections
lines = content.split('\n')

# Find section boundaries
sections = {}
current_section = None
section_start = 0

for i, line in enumerate(lines):
    if '<!-- Director Section -->' in line:
        sections['director_start'] = i
    elif '<!-- Teachers Section -->' in line:
        sections['director_end'] = i
        sections['teachers_start'] = i
    elif '<!-- Why Choose Us Section -->' in line:
        sections['teachers_end'] = i
        sections['why_start'] = i
    elif '<!-- Learning Pathways Section -->' in line:
        sections['why_end'] = i
        sections['pathways_start'] = i
    elif '<!-- Gallery Section -->' in line:
        sections['pathways_end'] = i
        sections['gallery_start'] = i
    elif '<!-- Programs Section -->' in line:
        sections['gallery_end'] = i
        sections['programs_start'] = i
    elif '<!-- Contact Section -->' in line:
        sections['programs_end'] = i
        sections['contact_start'] = i
    elif '<!-- Footer -->' in line:
        sections['contact_end'] = i
        sections['footer_start'] = i

# Extract sections
director_section = lines[sections['director_start']:sections['director_end']]
teachers_section = lines[sections['teachers_start']:sections['teachers_end']]
why_section = lines[sections['why_start']:sections['why_end']]
pathways_section = lines[sections['pathways_start']:sections['pathways_end']]
gallery_section = lines[sections['gallery_start']:sections['gallery_end']]
programs_section = lines[sections['programs_start']:sections['programs_end']]
contact_section = lines[sections['contact_start']:sections['contact_end']]

# Create testimonials section
testimonials_section = [
    '',
    '    <!-- Testimonials Section -->',
    '    <section class="testimonials-section">',
    '        <div class="container">',
    '            <div class="section-header">',
    '                <h2 class="section-title">What Parents Say</h2>',
    '                <p class="section-subtitle">Testimonials from Our Happy Families</p>',
    '            </div>',
    '            <div class="testimonials-grid">',
    '                <div class="testimonial-card">',
    '                    <div class="testimonial-content">',
    '                        <p class="testimonial-text">',
    '                            "First Step Montessori has been a blessing for our family. Our daughter has grown so much in confidence',
    '                            and independence. The teachers are incredibly caring and professional."',
    '                        </p>',
    '                    </div>',
    '                    <div class="testimonial-author">',
    '                        <div class="author-image">',
    '                            <img src="images/parent-1.jpg" alt="Parent testimonial">',
    '                        </div>',
    '                        <div class="author-info">',
    '                            <h4 class="author-name">Priya & Raj Malhotra</h4>',
    '                            <p class="author-role">Parents of Aarav (Age 4)</p>',
    '                        </div>',
    '                    </div>',
    '                </div>',
    '                <div class="testimonial-card">',
    '                    <div class="testimonial-content">',
    '                        <p class="testimonial-text">',
    '                            "The Montessori approach at First Step has helped our son develop a genuine love for learning.',
    '                            We couldn\'t be happier with the progress he\'s made!"',
    '                        </p>',
    '                    </div>',
    '                    <div class="testimonial-author">',
    '                        <div class="author-image">',
    '                            <img src="images/parent-2.jpg" alt="Parent testimonial">',
    '                        </div>',
    '                        <div class="author-info">',
    '                            <h4 class="author-name">Anita Desai</h4>',
    '                            <p class="author-role">Mother of Rohan (Age 5)</p>',
    '                        </div>',
    '                    </div>',
    '                </div>',
    '                <div class="testimonial-card">',
    '                    <div class="testimonial-content">',
    '                        <p class="testimonial-text">',
    '                            "Exceptional school with a warm, nurturing environment. Our twins have thrived here,',
    '                            developing both academically and socially. Highly recommended!"',
    '                        </p>',
    '                    </div>',
    '                    <div class="testimonial-author">',
    '                        <div class="author-image">',
    '                            <img src="images/parent-3.jpg" alt="Parent testimonial">',
    '                        </div>',
    '                        <div class="author-info">',
    '                            <h4 class="author-name">Vikram & Meera Sharma</h4>',
    '                            <p class="author-role">Parents of Twins (Age 3)</p>',
    '                        </div>',
    '                    </div>',
    '                </div>',
    '            </div>',
    '        </div>',
    '    </section>',
    ''
]

# Build new content with reorganized sections
# Keep everything before Director section
new_lines = lines[:sections['director_start']]

# Add sections in new order: Why Choose Us, Pathways, Programs, Gallery, Director, Teachers, Testimonials, Contact
new_lines.extend(why_section)
new_lines.extend(pathways_section)
new_lines.extend(programs_section)
new_lines.extend(gallery_section)
new_lines.extend(director_section)
new_lines.extend(teachers_section)
new_lines.extend(testimonials_section)
new_lines.extend(contact_section)

# Add footer and rest
new_lines.extend(lines[sections['footer_start']:])

# Write back
with open('/Users/rohithkumar/Documents/MySites/FSM-Mys/index.html', 'w') as f:
    f.write('\n'.join(new_lines))

print("Sections reorganized successfully!")
print("New order: About → Why Choose Us → Pathways → Programs → Gallery → Director → Teachers → Testimonials → Contact")
