---
title: "404 - Bioinformatics"
---

# What is Bioinformatics?

Bioinformatics is the application of computational methods to biological data.

Modern biological experiments can produce enormous amounts of information. For example, DNA sequencing technologies can generate millions of short DNA sequences, while gene expression experiments can measure the activity of thousands of genes.

Analyzing this information often requires specialized software and substantial computational resources.

## Why Use HPC for Bioinformatics?

Bioinformatics workloads may involve:

- Processing millions of sequencing reads.
- Comparing large biological sequences.
- Analyzing thousands of biological samples.
- Running computationally intensive statistical models.
- Performing parallel analyses.
- Storing and transferring large datasets.

HPC clusters provide shared computing resources that can make these analyses more practical.

> **Important:** Not every bioinformatics task requires an HPC cluster. Small datasets and lightweight analyses may run efficiently on a personal computer. HPC becomes particularly useful when workloads exceed local resource capabilities or benefit from parallel execution.

# Understanding Common Biological Data Formats

Bioinformatics workflows use specialized file formats to represent biological sequences, sequencing results, and analysis outputs.

Before working with biological datasets, researchers should understand the purpose of common file formats.

| Format | Description | Common Use |
| ---- | ---- | ---- |
| FASTA `(.fa, .fasta)` | Stores biological sequences with identifiers | Reference genomes and protein sequences |
| FASTQ `(.fastq, .fq)` | Stores sequencing reads and associated quality scores | Raw sequencing data | 
| SAM `(.sam)` | Text format containing sequence alignment information | Read alignment |
| BAM `(.bam)` | Compressed binary representation of alignment data | Storage and analysis of aligned reads |
| CRAM `(.cram)` | Reference-based compressed alignment format | Efficient storage of sequencing alignments |
| VCF `(.vcf)` | Stores genetic sequence variations | Variant analysis |
| GFF/GTF | Describes genomic features and annotations | Gene and transcript annotation |
| CSV/TSV | Stores tabular data | Gene expression matrices and metadata |

**FASTA Files**

FASTA is a text-based format for representing biological sequences.

Example:

```bash
>sequence_1
ATGCGTACGTAGCTAG
>sequence_2
GCTAGCTAGCATCGTA
```

Each sequence begins with a header line containing >, followed by one or more lines of sequence data.

**FASTQ Files**

FASTQ files contain sequencing reads and quality scores.

Example:

```bash
@read_1
ATGCGTAC
+
IIIIIIII
```

A FASTQ record contains four lines:

1. **Sequence identifier**: Identifies the read.
2. **Nucleotide sequence**: Contains the biological sequence.
3. **Separator**: Begins with +.
4. **Quality scores**: Encodes confidence in each base call.

Each quality character corresponds to a nucleotide in the sequence.

For example, an `I` generally represents a high-quality base call in the commonly used Phred+33 encoding.

**Why File Formats Matter**

Different bioinformatics tools expect specific input formats.

For example:

- FastQC commonly analyzes FASTQ sequencing reads.
- Alignment tools often produce SAM or BAM files.
- Variant callers may generate VCF files.
- Gene expression tools may produce CSV or TSV tables.

Using an incorrect file format can cause software errors or unexpected results.

**Why Use Slurm?**

Bioinformatics tasks may require substantial computing resources and can run for extended periods.

Slurm allows researchers to:
- Request appropriate CPUs and memory.
- Submit computational tasks to compute nodes.
- Monitor job progress.
- Execute long-running workflows without keeping an interactive terminal open.
- Capture program output and error messages.