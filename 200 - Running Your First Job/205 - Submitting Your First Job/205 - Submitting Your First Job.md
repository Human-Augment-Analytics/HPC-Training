# 205 - Submitting Your First Job
#### [Made by CS 8803 MGT & Leadership GT with Scribe](https://scribehow.com/o/RwVvEgxYTayBbEjBpzDTfg/viewer/205_-_Submitting_Your_First_Job__EHS06sTiSamsB_0Gmc9FWw)
Create a simple Slurm script, submit it with sbatch, monitor it with squeue, and read the resulting output file.

#### Directory Setup


1\. Create a folder for your first job\
Type "[[mkdir -p \~/first-job-demo]] [[Return]]"

![](https://colony-recorder.s3.amazonaws.com/files/2026-07-31/859e8fc8-6b13-428f-b1cf-bfc6bbf01f7c/user_cropped_screenshot_5bb46bacdcce472b9c67665f4748a7e3_text_export.jpeg)


2\. Open the first-job folder\
Type "[[cd \~/first-job-demo]] [[Return]]"

![](https://colony-recorder.s3.amazonaws.com/files/2026-07-31/31c7e102-f149-45b0-ba9e-d8e807aaf9ea/sps-redacted-d3438c3b0c494ab7880cb6f60b0eedce_08f1a36d76bf49d782bbb02fcf13cc70_text_export.jpeg)


3\. Confirm your working directory\
Type "[[pwd]] [[Return]]"

![](https://colony-recorder.s3.amazonaws.com/files/2026-07-31/2c645058-3c6a-4ad5-b49c-af9cc38d0359/user_cropped_screenshot_439c1b1923f54c27802ba93b235bd1d5_text_export.jpeg)


#### Create the Job Script


4\. Open a new Slurm script in Nano\
Type "[[nano first-job.slurm]] [[Return]]"\
It will open a window as shown below.

![](https://colony-recorder.s3.amazonaws.com/files/2026-07-31/15c3d1e6-a508-4546-9a68-75c0bda84e0e/sps-redacted-244a6483605f4462a157ce33ddb53b14_465bd0395bb04b209a4251a0e3f6c424_text_export.jpeg)


5\. Paste and Save the Slurm script as first-job.slurm \
Paste script then Type "[[Ctrl]] + [[O]]  [[Enter]] "

![](https://colony-recorder.s3.amazonaws.com/files/2026-07-31/e9bdc16c-fdfc-493c-aada-ff9e077f06ca/sps-redacted-e29cc75fc0ca4624b8437be3b64545ab_6e51af48f8e34685ac9af832dca6e080_text_export.jpeg)

![](https://colony-recorder.s3.amazonaws.com/files/2026-07-31/462ce48d-95bf-4219-bf32-63f7a57e61a8/sps-redacted-ac66290b1bdd44889980586a196dca21_35296b7d57144b93a66bc4e645080197_text_export.jpeg)


6\. Exit Nano After Saving\
Press [[Ctrl]] + [[X]]  to exit

![](https://colony-recorder.s3.amazonaws.com/files/2026-07-31/40ad4f9e-16fb-4606-9b9b-c3378d46f268/sps-redacted-71e8e28fafea4412b4385c8851988642_314a16765f0f4f16bc64f360f06e2c49_text_export.jpeg)


Tip: Tip! 

Display the file to make sure it was saved correctly: 

[[cat first-job.slurm]]


#### Submit the Job


7\. Submit the job to Slurm\
Type "[[sbatch first-job.slurm]] [[Return]]"

![](https://colony-recorder.s3.amazonaws.com/files/2026-07-31/4d226392-1271-4949-8a2e-7e0189ef3d9e/sps-redacted-7f3fadc9c440491b806ea39893d1c6a4_2ec4e174d687446f953f7c9e960bed54_text_export.jpeg)


8\. This number is your job ID. Your number will be different!

![](https://colony-recorder.s3.amazonaws.com/files/2026-07-31/897030b3-04f1-4056-9671-f3a8d9bd01bd/user_cropped_screenshot_589465c33d6f4cb59c36eaf540a97467_text_export.jpeg)


#### Monitor Job Status


9\. Check your job in the queue

Type "[[squeue -u "$USER"]] [[Return]]"

![](https://colony-recorder.s3.amazonaws.com/files/2026-07-31/80bf2d89-15e0-433d-9511-449707c62ba6/sps-redacted-5fe320e8788449208d553a962bf1c751_5f4ca2933dda44dba1bc7e687b4d208f_text_export.jpeg)


10\. Check your job by its ID

Type "[[squeue -j 5554670]] [[Return]]"

![](https://colony-recorder.s3.amazonaws.com/files/2026-07-31/56ca1b18-58af-49c8-adcf-d72a9a7fac30/sps-redacted-fcb5ff0e6017418483f062c9881c8ddc_1350a3bbb53b45b8bec6dc0257e3bdaa_text_export.jpeg)


Tip: Tip! 

- R means the job is running.
- PD means the job is waiting to run.
- Wait about one minute and check again. If the job no longer appears, it has left the queue.


#### Verify Job Output


11\. Find the Slurm output file.\
Type "[[ls -lh]] [[Return]]"

![](https://colony-recorder.s3.amazonaws.com/files/2026-07-31/45a10f02-990d-4cdd-a44e-964309c6411f/sps-redacted-6388dfb52343412485c4bc9de9d922de_82a0ef4d876343d8931ad2ef964c94ec_text_export.jpeg)


12\. Read the job's output. 

Type "[[cat first-job-5554670.out]] [[Return]]"

A successful job should end with "Your first Slurm job completed successfully"

![](https://colony-recorder.s3.amazonaws.com/files/2026-08-01/936dff17-e6a9-47fd-8723-223d07297c23/user_cropped_screenshot_993f2c9a81724d38b4404de80d780195_text_export.jpeg)
#### [Made with Scribe](https://scribehow.com/o/RwVvEgxYTayBbEjBpzDTfg/viewer/205_-_Submitting_Your_First_Job__EHS06sTiSamsB_0Gmc9FWw)


